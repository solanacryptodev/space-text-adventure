import { singleton } from 'tsyringe';
import { makeObservable, observable, action } from 'mobx';
import { DialogueNode } from '~/viewmodels/DialogueGraph/DialogueNode';
import router from 'next/router';
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
      handleHomeEffect: action.bound,
      handleMintEffect: action.bound,
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
      const selectedOption = node.options[optionIndex]!;

      // Check effects and handle them
      if (selectedOption.effects?.returnHome) {
        this.handleHomeEffect();
      }
      if (selectedOption.effects?.mintNFT) {
        this.handleMintEffect();
      }

      return this.nodes.get(selectedOption.targetNodeId)!;
    }
    return null;
  }

  handleHomeEffect() {
    router.push({
      pathname: '/',
    });
  }

  handleMintEffect() {
    console.log('minting');
    // TODO: mint NFT
  }
}
