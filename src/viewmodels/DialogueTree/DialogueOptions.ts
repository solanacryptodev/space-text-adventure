import { makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

/*
 * DialogueOption represents a selectable player choice that leads to another DialogueNode.
 * */
@singleton()
export class DialogueOptions extends StandardViewModel {
  text: string;
  targetNodeId: string;

  constructor() {
    super();
    this.text = '';
    this.targetNodeId = '';

    makeObservable(this, {
      text: observable,
      targetNodeId: observable,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}
}
