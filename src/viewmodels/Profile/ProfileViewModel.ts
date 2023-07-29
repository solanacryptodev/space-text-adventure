import { action, observable, makeObservable } from 'mobx';
import { PublicKey } from '@solana/web3.js';

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
      submitProfile: action.bound,
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

  submitProfile(): void {
    // TODO: Call Profile Model method that wraps the Mercury API call
    console.log('Profile submitted');
  }
}
