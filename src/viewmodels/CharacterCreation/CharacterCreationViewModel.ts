import { singleton } from 'tsyringe';
import { action, makeObservable, observable } from 'mobx';
import router from 'next/router';
import { Characters } from '~/lib/types/globalTypes';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class CharacterCreationViewModel extends StandardViewModel {
  characterModalActive: boolean;
  characters: Characters[];

  constructor() {
    super();
    this.characterModalActive = true;
    this.characters = [];

    makeObservable(this, {
      characterModalActive: observable,
      characters: observable,

      validatePlayerCharacter: action.bound,
      displayCharacterCreateModal: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  validatePlayerCharacter(): void {
    // get SHDW drive world storage
    // see if selected character has been added
    router.push({ pathname: '/game' });
  }

  displayCharacterCreateModal(active: boolean): boolean {
    this.characterModalActive = active;
    router.push({ pathname: '/character' });

    return this.characterModalActive;
  }
}
