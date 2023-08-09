import { ShdwDrive, ShadowDriveVersion, ShadowFile } from '@shadow-drive/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { CharacterAndProfileData } from '~/lib/types/globalTypes';

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
  const uploadCharacterFiles = async (
    connection: Connection,
    wallet: AnchorWallet | undefined,
    gumDomainName: string,
    characterName: string,
    characterAge: string
  ): Promise<void> => {
    try {
      // TODO: get this working, almost there
      // via the Mercury API, upload ShadowFiles to storage
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccountKey = getStorageAccounts.at(0)!.publicKey;
      const profileAndCharacterData: CharacterAndProfileData = {
        gumProfileDomain: gumDomainName,
        characters: [
          {
            characterName,
            characterAge,
          },
        ],
      };

      const gameDataBuffer = Buffer.from(JSON.stringify(profileAndCharacterData));

      const fileToUpload: ShadowFile = {
        name: `${gumDomainName} Character Data`,
        file: gameDataBuffer,
      };

      const uploadFile = await shdwDrive.uploadFile(storageAccountKey, fileToUpload);
      console.log('uploaded file: ', uploadFile);
    } catch (error) {
      console.log('upload error: ', error);
    }
  };

  const getFilesFromWorldStorage = async (
    connection: Connection,
    wallet: AnchorWallet | undefined
  ): Promise<string[]> => {
    let files: string[] = [];
    try {
      // via the Mercury API, get all ShadowFiles from storage
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccount = getStorageAccounts.at(0)!.publicKey;
      const storageAcct = await shdwDrive.getStorageAccount(storageAccount);
      const storageAcctKey = storageAcct.storage_account;
      const storageFiles = await shdwDrive.listObjects(new PublicKey(storageAcctKey));
      console.log('stored objects: ', storageFiles.keys);
      files = storageFiles.keys;
    } catch (error) {
      console.log('get files error: ', error);
    }
    return files;
  };

  return { createStorageAccount, uploadCharacterFiles, getFilesFromWorldStorage };
};
