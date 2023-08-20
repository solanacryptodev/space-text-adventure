import { ShdwDrive } from '@shadow-drive/sdk';
import * as anchor from '@project-serum/anchor';
import { NFTMetadata } from '~/lib/types/globalTypes';
import { guestIdentity, Metaplex } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import {
  createCreateTreeInstruction,
  createMintV1Instruction,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum';
import {
  getConcurrentMerkleTreeAccountSize,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  ValidDepthSizePair,
} from '@solana/spl-account-compression';
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { CompressionViewModel } from '~/viewmodels/Compression/CompressionViewModel';
import { useViewModel } from '../../reactReactive/viewmodels/useViewModel';

export const useCompressionMachine = () => {
  const compressionVM = useViewModel<CompressionViewModel>(CompressionViewModel);

  const uploadJSONMetadata = async (connection: Connection, wallet: any): Promise<void> => {
    try {
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccountKey = new anchor.web3.PublicKey(getStorageAccounts[0]!.publicKey);
      const cNFTData: NFTMetadata = {
        description:
          'This compressed NFT was created by the Compression Machine as part of a text-based demo game released on ' +
          'August 21, 2023.',
        image:
          'https://shdw-drive.genesysgo.net/AWjnok2j7Nfa6BpFg34UhTQsAZ63g7ctSQpqi8MKTkME/armor%20of%20sol.jpg',
        external_url: 'https://www.genesysrealms.io',
        attributes: [
          {
            trait_type: 'Hackathon',
            value: 'OPOS (Only Possible On Solana)',
          },
          {
            trait_type: 'Game',
            value: 'The Compression Machine Demo',
          },
          {
            trait_type: 'Armor',
            value: 'Sol',
          },
        ],
        properties: {
          files: [
            {
              uri: 'https://shdw-drive.genesysgo.net/AWjnok2j7Nfa6BpFg34UhTQsAZ63g7ctSQpqi8MKTkME/armor%20of%20sol.jpg',
              type: 'image/jpg',
            },
          ],
        },
      };
      const gameData = JSON.stringify(cNFTData);
      const blob = new Blob([Buffer.from(gameData)], { type: 'application/json' });
      const myFile = new File([blob], 'armor_of_sol.json', {
        type: 'application/json',
      });

      const uploadFile = await shdwDrive.uploadFile(storageAccountKey, myFile);
      console.log('metadata uri', uploadFile);
    } catch (error) {
      console.log('error uploading JSON', error);
    }
  };

  const createMerkleTree = async (connection: Connection, wallet: any) => {
    const merkleTree = Keypair.generate();
    compressionVM.merkleTreeAccount = merkleTree.publicKey.toString();
    console.log('merkle tree key', compressionVM.merkleTreeAccount);

    const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
      [merkleTree.publicKey.toBuffer()],
      BUBBLEGUM_PROGRAM_ID
    );

    const depthSizePair: ValidDepthSizePair = {
      maxDepth: 16,
      maxBufferSize: 64,
    };
    const canopyDepth = 8; // 16 - 8 = a proof of 8
    const space = getConcurrentMerkleTreeAccountSize(
      depthSizePair.maxDepth,
      depthSizePair.maxBufferSize,
      canopyDepth
    );

    const createAccountIx = SystemProgram.createAccount({
      newAccountPubkey: merkleTree.publicKey,
      fromPubkey: wallet!.publicKey,
      space,
      lamports: await connection.getMinimumBalanceForRentExemption(space),
      programId: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
    });

    const createTreeIx = createCreateTreeInstruction(
      {
        merkleTree: merkleTree.publicKey,
        treeAuthority,
        payer: wallet!.publicKey!,
        treeCreator: wallet!.publicKey!,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      },
      {
        maxDepth: depthSizePair.maxDepth,
        maxBufferSize: depthSizePair.maxBufferSize,
        public: true,
      }
    );

    try {
      const tx = new Transaction().add(createAccountIx).add(createTreeIx);
      tx!.feePayer = wallet!.publicKey!;

      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;

      // Partially sign the transaction with the merkleTree and then with the user's wallet
      tx!.partialSign(merkleTree);
      await wallet!.signTransaction(tx);

      // Serialize and send the transaction
      const signedTx = tx!.serialize();
      const txId = await connection.sendRawTransaction(signedTx);

      console.log('Transaction ID:', txId);
    } catch (error) {
      console.log('error creating merkle tree', error);
    }
  };

  const createCollection = async (connection: Connection, wallet: AnchorWallet) => {
    const metaplex = Metaplex.make(connection).use(guestIdentity(wallet.publicKey));
    const mintKey = Keypair.generate();
    compressionVM.collectionMint = mintKey.publicKey.toString();
    console.log('collection mint key', mintKey.publicKey.toString());
    console.log('connection: ', connection);

    // Get the minimum lamport balance to create a new account and avoid rent payments
    const requiredBalance = await getMinimumBalanceForRentExemptMint(connection);
    // metadata account associated with mint
    const metadataPDA = metaplex!.nfts()!.pdas()!.metadata({ mint: mintKey.publicKey })!;
    // get associated token account of your wallet
    const tokenATA = await getAssociatedTokenAddress(mintKey.publicKey, wallet.publicKey);

    const createNewTokenTransaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        lamports: requiredBalance,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKey.publicKey, // Mint Address
        0, // Number of Decimals of New mint
        wallet.publicKey, // Mint Authority
        wallet.publicKey, // Freeze Authority
        TOKEN_PROGRAM_ID
      ),
      createAssociatedTokenAccountInstruction(
        wallet.publicKey, // Payer
        tokenATA, // Associated token account
        wallet.publicKey, // token owner
        mintKey.publicKey // Mint
      ),
      createMintToInstruction(
        mintKey.publicKey, // Mint
        tokenATA, // Destination Token Account
        wallet.publicKey, // Authority
        1 // number of tokens.
      ),
      createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: mintKey.publicKey,
          mintAuthority: wallet.publicKey,
          payer: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: 'The Armor of Compression',
              symbol: 'ACOM',
              uri: 'https://shdw-drive.genesysgo.net/AWjnok2j7Nfa6BpFg34UhTQsAZ63g7ctSQpqi8MKTkME/armor_of_compression.json',
              sellerFeeBasisPoints: 0,
              creators: null,
              collection: null,
              uses: null,
            },
            isMutable: true,
            collectionDetails: null,
          },
        }
      )
      //   createCreateMasterEditionV3Instruction(
      //     {
      //       edition: masterEditionPDA,
      //       mint: mintKey.publicKey,
      //       mintAuthority: wallet.publicKey,
      //       payer: wallet.publicKey,
      //       updateAuthority: wallet.publicKey,
      //       metadata: metadataPDA,
      //       tokenProgram: TOKEN_PROGRAM_ID,
      //     },
      //     {
      //       createMasterEditionArgs: {
      //         maxSupply: 0,
      //       },
      //     },
      //     TOKEN_METADATA_PROGRAM_ID
      //   ),
      //   createSetCollectionSizeInstruction(
      //     {
      //       collectionMetadata: metadataPDA,
      //       collectionAuthority: wallet.publicKey,
      //       collectionMint: mintKey.publicKey,
      //     },
      //     {
      //       setCollectionSizeArgs: { size: 15000 },
      //     },
      //     TOKEN_METADATA_PROGRAM_ID
      //   )
    );
    console.log('createNewTokenTransaction', createNewTokenTransaction);

    try {
      createNewTokenTransaction!.feePayer = wallet!.publicKey!;

      const latestBlockhash = await connection.getLatestBlockhash();
      createNewTokenTransaction.recentBlockhash = latestBlockhash.blockhash;

      // Partially sign the transaction with the mintKey and then with the user's wallet
      createNewTokenTransaction!.partialSign(mintKey);
      await wallet!.signTransaction(createNewTokenTransaction);

      // Serialize and send the transaction
      const signedTx = createNewTokenTransaction!.serialize();
      const txId = await connection.sendRawTransaction(signedTx);
      console.log('Transaction ID:', txId);
    } catch (error) {
      console.log(error);
    }
  };

  const mintCompressedNFT = async (connection: Connection, wallet: any) => {
    const creator = new PublicKey('ChS3sLSGg8h1hbF3ryyLY4hF5ucQNcMiqCJLQ8ztVqDv');
    const merkleTree = new PublicKey('8hQh77KdmfYvSd8juA2Whr3KznmXZmFDmABje3oTJC3y');
    const collectionMint = new PublicKey('6BKGAnacnaWY6Q1ifBH6BUFwEUiVr7ER7WgwzQfBNScw'); // actual cNFT address
    const collectionAuthority = Keypair.fromSecretKey(compressionVM.demoKey);
    const treeDelegate = Keypair.fromSecretKey(compressionVM.demoKey);

    const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
      [merkleTree.toBuffer()],
      BUBBLEGUM_PROGRAM_ID
    );
    console.log('treeAuthority', treeAuthority.toString()!);

    const [collectionEditionAccount, _b2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata', 'utf8'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        collectionMint.toBuffer(),
        Buffer.from('edition', 'utf8'),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    console.log('collectionEditionAccount', collectionEditionAccount!.toString()!);
    const [bgumSigner, __] = PublicKey.findProgramAddressSync(
      [Buffer.from('collection_cpi', 'utf8')],
      BUBBLEGUM_PROGRAM_ID
    );
    const mintCNFT = new Transaction().add(
      createMintV1Instruction(
        {
          treeAuthority,
          leafOwner: wallet.publicKey,
          leafDelegate: wallet.publicKey,
          merkleTree,
          payer: wallet.publicKey,
          treeDelegate: creator,
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        },
        {
          message: {
            name: 'The Armor of Compression',
            symbol: 'ACOM',
            uri: 'https://shdw-drive.genesysgo.net/AWjnok2j7Nfa6BpFg34UhTQsAZ63g7ctSQpqi8MKTkME/armor_of_compression.json',
            sellerFeeBasisPoints: 0,
            primarySaleHappened: true,
            isMutable: true,
            uses: null,
            tokenStandard: TokenStandard.FungibleAsset,
            editionNonce: null,
            tokenProgramVersion: TokenProgramVersion.Token2022,
            collection: null,
            creators: [],
          },
        }
      )
    );

    console.log('mintCNFT', mintCNFT);

    try {
      // send transaction
      mintCNFT!.feePayer = wallet!.publicKey!;

      const latestBlockhash = await connection.getLatestBlockhash();
      mintCNFT.recentBlockhash = latestBlockhash.blockhash;

      mintCNFT.partialSign(collectionAuthority);
      mintCNFT.partialSign(treeDelegate);
      await wallet!.signTransaction(mintCNFT);

      // Serialize and send the transaction
      const signedTx = mintCNFT!.serialize();
      const txId = await connection.sendRawTransaction(signedTx);
      if (txId) {
        compressionVM.setTxID(txId);
      }
      console.log('Transaction ID:', txId);
    } catch (e) {
      console.error('error minting: ', e);
    }
  };

  return { uploadJSONMetadata, createMerkleTree, createCollection, mintCompressedNFT };
};
