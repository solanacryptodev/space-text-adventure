import { singleton } from 'tsyringe';
import { makeObservable, observable, action } from 'mobx';
import { DialogueNode } from '~/viewmodels/DialogueTree/DialogueNode';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

/*
 * DialogueGraph represents the DAG and provides methods for traversal and adding nodes.
 * */
@singleton()
export class DialogueGraph extends StandardViewModel {
  nodes: Map<string, DialogueNode>;
  initialized: boolean;

  constructor() {
    super();
    this.nodes = new Map();
    this.initialized = false;

    makeObservable(this, {
      nodes: observable,
      initialized: observable,

      addNode: action.bound,
      selectOption: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  addNode(node: DialogueNode) {
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, node);
    }
  }

  selectOption(nodeId: string, optionIndex: number): DialogueNode | null {
    const node = this.nodes.get(nodeId);
    if (node && node.options[optionIndex]) {
      return this.nodes.get(node.options[optionIndex]!.targetNodeId)!;
    }
    return null;
  }
}
