import { ShdwDrive, ShadowDriveVersion } from '@shadow-drive/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { CharacterAndProfileData } from '~/lib/types/globalTypes';
import { Buffer } from 'buffer';
import * as anchor from '@project-serum/anchor';

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
    wallet: any,
    gumDomainName: string,
    characterName: string,
    characterAge: string
  ): Promise<void> => {
    try {
      // via the Mercury API, upload ShadowFiles to storage
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccountKey = new anchor.web3.PublicKey(getStorageAccounts[0]!.publicKey);
      const initializeInventory: string[] = [];
      const profileAndCharacterData: CharacterAndProfileData = {
        gumProfileDomain: gumDomainName,
        characters: [
          {
            characterName,
            characterAge,
          },
        ],
        inventory: initializeInventory,
      };

      const gameData = JSON.stringify(profileAndCharacterData);
      const blob = new Blob([Buffer.from(gameData)], { type: 'application/json' });
      const myFile = new File([blob], `${gumDomainName}_Character_Data.json`, {
        type: 'application/json',
      });

      const uploadFile = await shdwDrive.uploadFile(storageAccountKey, myFile);
      console.log('uploaded file: ', uploadFile);
    } catch (error) {
      console.log('upload error: ', error);
    }
  };

  /*
   * - Filename is the name of the document stored on the storage account
   * */
  const getFilesFromStorage = async (
    connection: Connection,
    wallet: any,
    fileName: string
  ): Promise<string[]> => {
    const files: string[] = [];
    try {
      // via the Mercury API, get all ShadowFiles from storage
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccount = getStorageAccounts.at(0)!.publicKey;
      const storageAcct = await shdwDrive.getStorageAccount(storageAccount);
      const storageAcctKey = storageAcct.storage_account;
      const storageFiles = await shdwDrive.listObjects(new PublicKey(storageAcctKey));
      console.log('stored objects: ', storageFiles.keys);

      if (storageFiles.keys.includes(fileName)) {
        // TODO: create a StorageModel to store a users shdw acct data
        files.push(fileName);
        await buildShadowUrl(String(storageAcctKey), fileName);
      } else {
        console.log(`${fileName} file not found`);
      }
    } catch (error) {
      console.log('get files error: ', error);
    }
    return files;
  };

  const buildShadowUrl = async (storageAccountKey: string, fileName: string): Promise<string> => {
    return `https://shdw-drive.genesysgo.net/${storageAccountKey}/${fileName}`;
  };

  // const editInventoryShdwFile = async (connection: Connection, wallet: any): Promise<void> => {
  //   try {
  //     const shdwDrive = await new ShdwDrive(connection, wallet).init();
  //     const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
  //     const storageAccountKey = new anchor.web3.PublicKey(getStorageAccounts[0]!.publicKey);
  //     await shdwDrive.editFile(storageAccountKey, '', );
  //   } catch (error) {
  //     console.log('error editing files: ', error);
  //   }
  // };

  return { createStorageAccount, uploadCharacterFiles, getFilesFromStorage, buildShadowUrl };
};
