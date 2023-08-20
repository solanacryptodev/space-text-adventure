import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

export const useHandyInstructions = () => {
  const transferSolToGM = async (connection: Connection, wallet: any, amount: string) => {
    const gameMasterKey = process.env.NEXT_PUBLIC_OPOS_GAME_MASTER_KEY as string;
    const toGM = new PublicKey(gameMasterKey);

    let solAmount = Number(amount);

    // Handle decimals by converting to string
    // and parsing float value
    if (amount.toString().includes('.')) {
      solAmount = parseFloat(String(amount));
    }

    // Convert SOL to lamports
    const lamportAmount = solAmount * LAMPORTS_PER_SOL;
    console.log('lamport amt: ', lamportAmount);

    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: toGM,
        lamports: lamportAmount,
      })
    );

    try {
      transaction!.feePayer = wallet!.publicKey!;

      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;

      await wallet!.signTransaction(transaction);

      // Serialize and send the transaction
      const signedTx = transaction!.serialize();
      const txId = await connection.sendRawTransaction(signedTx);
      console.log('Transaction ID:', txId);
    } catch (error) {
      console.log(error);
    }
  };

  return { transferSolToGM };
};
