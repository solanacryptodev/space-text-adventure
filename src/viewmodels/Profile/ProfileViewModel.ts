import { action, observable, makeObservable } from 'mobx';
import { singleton } from 'tsyringe';
import { ProfileModel } from '~/models/Profile/ProfileModel';
import { ShadowDriveVersion, ShdwDrive } from '@shadow-drive/sdk';
import { Connection } from '@solana/web3.js';
import { SessionWalletInterface } from '@gumhq/react-sdk';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class ProfileViewModel extends StandardViewModel {
  protected profileModel = this.addDependency(ProfileModel);
  publicKey: string | undefined;
  profilePicture: string | undefined;
  characters: string[] | undefined;
  domainName: string;
  profileName: string;

  storageName: string;
  storageSize: string;
  version: ShadowDriveVersion;
  wallet: SessionWalletInterface | undefined | Uint8Array;

  constructor() {
    super();
    this.publicKey = '';
    this.domainName = 'brian';
    this.profileName = 'janus';
    this.profilePicture = '';
    this.characters = [];

    this.storageName = 'opos';
    this.storageSize = '10MB';
    this.version = 'v2';
    this.wallet = undefined;

    makeObservable(this, {
      publicKey: observable,
      profilePicture: observable,
      characters: observable,
      domainName: observable,
      profileName: observable,

      storageName: observable,
      storageSize: observable,
      wallet: observable,

      setPublicKey: action.bound,
      setProfilePicture: action.bound,
      setCharacters: action.bound,
      submitProfileToModel: action.bound,
      setDomainName: action.bound,
      setProfileName: action.bound,
      createStorageAccount: action.bound,

      setStorageName: action.bound,
      setStorageSize: action.bound,
      setWallet: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  setStorageName(storageName: string): void {
    this.storageName = storageName;
  }

  setStorageSize(storageSize: string): void {
    this.storageSize = storageSize;
  }

  setWallet(wallet: Uint8Array | undefined): void {
    this.wallet = wallet;
  }

  setDomainName(domainName: string): void {
    this.domainName = domainName;
    console.log('Domain name set to: ', this.domainName);
  }

  setProfileName(profileName: string): void {
    this.profileName = profileName;
    console.log('Profile name set to: ', this.profileName);
  }

  setPublicKey(publicKey: string | undefined): void {
    this.publicKey = publicKey;
  }

  setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  setCharacters(characters: string[]): void {
    this.characters = characters;
  }

  submitProfileToModel(): void {
    this.profileModel.submitProfile(this.domainName, this.profileName, this.publicKey);
    console.log('Profile submitted VM');
  }

  async createStorageAccount(
    name: string,
    size: string,
    version: ShadowDriveVersion,
    wallet: AnchorWallet | undefined,
    connection: Connection
  ): Promise<string> {
    const shdwDrive = await new ShdwDrive(connection, wallet).init();
    const drive = await shdwDrive.createStorageAccount(name, size, version);
    console.log('shdw bucket: ', drive.shdw_bucket);
    return drive.shdw_bucket;
  }
}
