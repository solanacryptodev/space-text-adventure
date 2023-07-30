import { singleton } from 'tsyringe';
import { action, makeObservable } from 'mobx';
import { createProfile } from '~/lib/mercury';

@singleton()
export class ProfileModel {
  constructor() {
    makeObservable(this, {
      submitProfile: action.bound,
    });
  }

  submitProfile(
    domainName: string,
    screenName: string,
    publicKey: string,
    profilePic: string
  ): void {
    createProfile(domainName, screenName, publicKey, profilePic);
    console.log('Profile submitted Model');
  }
}
