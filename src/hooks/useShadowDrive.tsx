import { ShdwDrive, ShadowDriveVersion } from '@shadow-drive/sdk';
import { Connection } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';

export const useShadowDrive = () => {
  const createStorageAccount = async (
    name: string,
    size: string,
    version: ShadowDriveVersion,
    wallet: AnchorWallet | undefined,
    connection: Connection
  ): Promise<void> => {
    try {
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      await shdwDrive.createStorageAccount(name, size, version);
    } catch (error) {
      console.log('createStorageAccount error: ', error);
    }
  };

  /* Uploaded files can be profiles saved to world storage */
  const uploadFilesToWorldStorage = async (): Promise<void> => {
    try {
      // via the Mercury API, upload ShadowFiles to storage
    } catch (error) {
      console.log('upload error: ', error);
    }
  };

  const getFilesFromWorldStorage = async (): Promise<void> => {
    try {
      // via the Mercury API, get all ShadowFiles from storage
    } catch (error) {
      console.log('get files error: ', error);
    }
  };

  return { createStorageAccount, uploadFilesToWorldStorage, getFilesFromWorldStorage };
};
