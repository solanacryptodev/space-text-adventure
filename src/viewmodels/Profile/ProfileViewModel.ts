import { action, observable, makeObservable } from 'mobx';
import { singleton } from 'tsyringe';
import { ProfileModel } from '~/models/Profile/ProfileModel';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class ProfileViewModel extends StandardViewModel {
  protected profileModel = this.addDependency(ProfileModel);
  publicKey: string | undefined;
  profilePicture: string | undefined;
  characters: string[] | undefined;
  domainName: string;
  profileName: string;

  constructor() {
    super();
    this.publicKey = '';
    this.domainName = '';
    this.profileName = '';
    this.profilePicture = '';
    this.characters = [];

    makeObservable(this, {
      publicKey: observable,
      profilePicture: observable,
      characters: observable,
      domainName: observable,
      profileName: observable,

      setPublicKey: action.bound,
      setProfilePicture: action.bound,
      setCharacters: action.bound,
      submitProfileToModel: action.bound,
      setDomainName: action.bound,
      setProfileName: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

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
}
