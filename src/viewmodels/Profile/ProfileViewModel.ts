import { action, observable, makeObservable, toJS, computed, autorun } from 'mobx';
import { singleton } from 'tsyringe';
import { ProfileModel } from '~/models/Profile/ProfileModel';
import { ListObjectsResponse, ShadowDriveVersion, ShdwDrive } from '@shadow-drive/sdk';
import { Connection } from '@solana/web3.js';
import { SessionWalletInterface } from '@gumhq/react-sdk';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import router from 'next/router';
import { fill, get } from 'lodash';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class ProfileViewModel extends StandardViewModel {
  protected profileModel = this.addDependency(ProfileModel);
  publicKey: string | undefined;
  profilePicture: string | undefined;
  domainName: string;
  profileName: string;

  storageName: string;
  storageSize: string;
  version: ShadowDriveVersion;
  wallet: SessionWalletInterface | undefined | Uint8Array;

  musicPlaying: boolean;
  music: string[];
  verified: boolean;

  constructor() {
    super();
    this.publicKey = '';
    this.domainName = '';
    this.profileName = '';
    this.profilePicture = '';

    this.storageName = '';
    this.storageSize = '';
    this.version = 'v2';
    this.wallet = undefined;

    this.musicPlaying = false;
    this.music = [];
    this.verified = false;

    makeObservable(this, {
      publicKey: observable,
      profilePicture: observable,
      domainName: observable,
      profileName: observable,
      musicPlaying: observable,
      music: observable,
      storageName: observable,
      storageSize: observable,
      wallet: observable,
      verified: observable,

      setPublicKey: action.bound,
      setProfilePicture: action.bound,
      submitProfileToModel: action.bound,
      setDomainName: action.bound,
      setProfileName: action.bound,
      createStorageAccount: action.bound,
      setMusicPlaying: action.bound,
      addMusic: action.bound,
      toggleMusic: action.bound,
      verifyDomainName: action.bound,

      setStorageName: action.bound,
      setStorageSize: action.bound,
      setWallet: action.bound,

      getMusic: computed,
    });
  }

  protected onInitialize(): void {
    if (!this.musicPlaying) {
      this.setMusicPlaying(true);
      console.log('music playing? ', this.musicPlaying);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  // protected createReactions(): void {
  //   this.addReaction(
  //     autorun(() => {
  //       if (!this.musicPlaying) {
  //         this.setMusicPlaying(true);
  //         console.log('music playing? ', this.musicPlaying);
  //       }
  //     })
  //   );
  // }

  get getMusic(): string[] {
    return this.music;
  }

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
  }

  setProfileName(profileName: string): void {
    this.profileName = profileName;
  }

  setPublicKey(publicKey: string | undefined): void {
    this.publicKey = publicKey;
  }

  setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  setMusicPlaying(playing: boolean): void {
    this.musicPlaying = playing;
  }

  addMusic(musicTrack: string): string[] {
    toJS(this.music.push(musicTrack));
    return toJS(this.music);
  }

  toggleMusic(): void {
    this.musicPlaying = !this.musicPlaying;
  }

  submitProfileToModel(): void {
    this.profileModel.submitProfile(this.domainName, this.profileName, this.publicKey);
    console.log('Profile submitted VM');
  }

  verifyDomainName(verified: boolean): void {
    this.verified = verified;
  }

  backToHome(): void {
    router.push({ pathname: '/' });
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
