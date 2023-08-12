import { StandardViewModel } from 'reactReactive/viewmodels/StandardViewModel';
import { makeObservable, observable, action } from 'mobx';
import { singleton } from 'tsyringe';
import { DialogueOptions } from '~/viewmodels/DialogueTree/DialogueOptions';

/*
 * DialogueNode represents a single piece of dialogue.
 * */
@singleton()
export class DialogueNode extends StandardViewModel {
  _id: string;
  content: string;
  options: DialogueOptions[];

  constructor() {
    super();
    this._id = '';
    this.content = '';
    this.options = [];

    makeObservable(this, {
      options: observable,

      addOption: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  addOption(option: DialogueOptions) {
    this.options.push(option);
  }
}
