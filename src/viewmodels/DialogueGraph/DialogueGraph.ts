import { singleton } from 'tsyringe';
import { makeObservable, observable, action, computed } from 'mobx';
import { DialogueNode } from '~/viewmodels/DialogueGraph/DialogueNode';
import router from 'next/router';
import { Effects } from '~/lib/types/gameEffects';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

/*
 * DialogueGraph represents the DAG and provides methods for traversal and adding nodes.
 * */
@singleton()
export class DialogueGraph extends StandardViewModel {
  nodes: Map<string, DialogueNode>;
  initialized: boolean;
  activateMintEffect: boolean;
  approvalKey: number[];

  constructor() {
    super();
    this.nodes = new Map();
    this.initialized = false;
    this.activateMintEffect = false;
    this.approvalKey = [];

    makeObservable(this, {
      nodes: observable,
      initialized: observable,
      activateMintEffect: observable,
      approvalKey: observable,

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

      if (selectedOption.effects) {
        this.triggerEffect(selectedOption.effects);
      }

      return this.nodes.get(selectedOption.targetNodeId)!;
    }
    return null;
  }

  triggerEffect(effect: Effects): void {
    if (effect.returnHome) {
      this.handleHomeEffect();
    } else if (effect.mintNFT) {
      this.handleMintEffect();
    }
  }

  handleHomeEffect(): void {
    router.push({
      pathname: '/',
    });
  }

  handleMintEffect(): void {
    this.activateMintEffect = true;
  }
}
