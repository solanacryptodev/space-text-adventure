import { action, makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';
import { DialogueData } from '~/lib/types/globalTypes';
import { DialogueGraph } from '~/viewmodels/DialogueGraph/DialogueGraph';
import { DialogueNode } from '~/viewmodels/DialogueGraph/DialogueNode';
import { DialogueOptions } from '~/viewmodels/DialogueGraph/DialogueOptions';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class DialogueGraphViewModel extends StandardViewModel {
  fade: boolean;

  graph: DialogueGraph;
  activeNode: DialogueNode;

  constructor() {
    super();
    this.fade = false;

    this.graph = new DialogueGraph();
    this.activeNode = new DialogueNode();

    makeObservable(this, {
      graph: observable,
      activeNode: observable,
      fade: observable,

      initializeGraph: action.bound,
      setActiveNode: action.bound,
      setFade: action.bound,
      populateGraphFromJSON: action.bound,
    });
  }

  protected onInitialize(): void {
    this.initializeGraph();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  // protected createReactions(): void {
  //   this.addReaction(
  //     autorun(() => {
  //       if (!this.graph.initialized) {
  //         this.setActiveNode(this.graph.nodes.get('1')!);
  //       }
  //     })
  //   );
  // }

  setActiveNode(node: DialogueNode): void {
    if (!node || !node.options) {
      return;
    }
    node.options = this.removeExtraOption(node.options);

    this.graph.initialized = true;
    this.activeNode = node;
  }

  setFade(fade: boolean): void {
    this.fade = !fade;
  }

  async initializeGraph(): Promise<void> {
    try {
      const jsonData = await fetch(
        `${process.env.NEXT_PUBLIC_WORLD_STORAGE_SHDW}/${process.env.NEXT_PUBLIC_OPOS_GAME_DATA}`
      );

      if (!jsonData.ok) {
        throw new Error(`Fetch error: ${jsonData.statusText}`);
      }

      const jsonGameData = await jsonData.json();
      this.populateGraphFromJSON(jsonGameData);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }

    // const nextNode = this.graph.selectOption('1', 0);
    if (!this.graph.initialized) {
      this.setActiveNode(this.graph.nodes.get('1')!);
    }
  }

  populateGraphFromJSON(jsonData: DialogueData): void {
    for (const dialogue of jsonData) {
      const newNode = new DialogueNode();

      newNode._id = dialogue.id;
      newNode.content = dialogue.content;

      for (const option of dialogue.options) {
        newNode.addOption({
          text: option.text,
          targetNodeId: option.targetNodeId,
          effects: option.effects,
        } as DialogueOptions);
      }

      this.graph.addNode(newNode);
    }
  }

  removeExtraOption(options: DialogueOptions[]): DialogueOptions[] {
    const seen = new Set<string>();

    if (options.length > 1) {
      return options.filter((option) => {
        const duplicate = seen.has(option.text);
        seen.add(option.text);
        return !duplicate;
      });
    }
    return options;
  }
}
