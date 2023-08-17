import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

export const useHandyInstructions = () => {
  const transferSolToGM = async (connection: Connection, wallet: any, amount: number) => {
    const gameMasterKey = process.env.NEXT_PUBLIC_OPOS_GAME_MASTER_KEY as string;

    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(gameMasterKey),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction!.feePayer = wallet!.publicKey!;

    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;

    // Partially sign the transaction with the merkleTree and then with the user's wallet
    await wallet!.signTransaction(transaction);

    // Serialize and send the transaction
    const signedTx = transaction!.serialize();
    const txId = await connection.sendRawTransaction(signedTx);

    console.log('Transaction ID:', txId);
  };

  return { transferSolToGM };
};
