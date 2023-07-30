import { action, observable, makeObservable } from 'mobx';
import { singleton } from 'tsyringe';
import { PublicKey } from '@solana/web3.js';

@singleton()
export class ProfileViewModel {
  publicKey: PublicKey;
  profilePicture: string | undefined;
  characters: string[] | undefined;

  constructor() {
    this.publicKey = new PublicKey('');

    makeObservable(this, {
      publicKey: observable,
      profilePicture: observable,
      characters: observable,

      setPublicKey: action.bound,
      setProfilePicture: action.bound,
      setCharacters: action.bound,
      submitProfileToModel: action.bound,
    });
  }

  setPublicKey(publicKey: PublicKey): void {
    this.publicKey = publicKey;
  }

  setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  setCharacters(characters: string[]): void {
    this.characters = characters;
  }

  submitProfileToModel(): void {
    // TODO: Call Profile Model method that wraps the Mercury API call
    console.log('Profile submitted VM');
  }
}
