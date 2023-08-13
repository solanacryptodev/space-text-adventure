import { ShdwDrive, ShadowDriveVersion } from '@shadow-drive/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { CharacterAndProfileData, DialogueData } from '~/lib/types/globalTypes';
import { Buffer } from 'buffer';
import * as anchor from '@project-serum/anchor';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { useViewModel } from '../../reactReactive/viewmodels/useViewModel';

export const useShadowDrive = () => {
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);

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

  const uploadGameData = async (
    connection: Connection,
    wallet: any,
    gameData: DialogueData
  ): Promise<void> => {
    try {
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccountKey = new anchor.web3.PublicKey(getStorageAccounts[0]!.publicKey);

      const rawGameData = JSON.stringify(gameData);
      const blob = new Blob([Buffer.from(rawGameData)], { type: 'application/json' });
      const myFile = new File([blob], 'opos_game_dialogue_data.json', {
        type: 'application/json',
      });

      await shdwDrive.uploadFile(storageAccountKey, myFile);
    } catch (error) {
      console.log('upload game data error: ', error);
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

      profileVM.setStorageKey(storageAcctKey.toString()); // store storage key in state

      const storageFiles = await shdwDrive.listObjects(new PublicKey(storageAcctKey));

      if (storageFiles.keys.includes(fileName)) {
        files.push(fileName);
        const url = await buildShadowUrl(String(storageAcctKey), fileName);
        profileVM.setStorageUrl(url); // store storage url in state
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

  const editInventoryShdwFile = async (
    connection: Connection,
    wallet: any,
    url: string,
    data: any, // data type
    version: ShadowDriveVersion
  ): Promise<void> => {
    try {
      const shdwDrive = await new ShdwDrive(connection, wallet).init();
      const getStorageAccounts = await shdwDrive.getStorageAccounts('v2');
      const storageAccountKey = new anchor.web3.PublicKey(getStorageAccounts[0]!.publicKey);

      const rawGameData = JSON.stringify(data);
      const blob = new Blob([Buffer.from(rawGameData)], { type: 'application/json' });
      const myFile = new File([blob], 'opos_game_dialogue_data.json', {
        type: 'application/json',
      });

      await shdwDrive.editFile(storageAccountKey, url, myFile, version);
    } catch (error) {
      console.log('error editing files: ', error);
    }
  };

  return {
    createStorageAccount,
    uploadCharacterFiles,
    uploadGameData,
    getFilesFromStorage,
    buildShadowUrl,
    editInventoryShdwFile,
  };
};
