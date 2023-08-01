import { singleton } from 'tsyringe';
import { action, makeObservable } from 'mobx';
import { createProfile } from '~/lib/mercury';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class ProfileModel extends StandardViewModel {
  constructor() {
    super();
    makeObservable(this, {
      submitProfile: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  submitProfile(domainName: string, profileName: string, publicKey: string | undefined): void {
    // createProfile(domainName, profileName, publicKey);
    console.log('Profile submitted Model: ', domainName, profileName, publicKey);
  }
}
