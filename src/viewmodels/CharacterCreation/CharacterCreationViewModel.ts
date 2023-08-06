import { singleton } from 'tsyringe';
import { action, makeObservable, observable } from 'mobx';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class CharacterCreationViewModel extends StandardViewModel {
  characterModalActive: boolean;
  constructor() {
    super();
    this.characterModalActive = false;

    makeObservable(this, {
      characterModalActive: observable,

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
  }

  displayCharacterCreateModal(active: boolean): boolean {
    this.characterModalActive = active;
    return this.characterModalActive;
  }
}
