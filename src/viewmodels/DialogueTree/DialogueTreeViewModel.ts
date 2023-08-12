import { action, makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';
import { DialogueData } from '~/lib/types/globalTypes';
import { DialogueGraph } from '~/viewmodels/DialogueTree/DialogueGraph';
import { DialogueNode } from '~/viewmodels/DialogueTree/DialogueNode';
import { DialogueOptions } from '~/viewmodels/DialogueTree/DialogueOptions';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class DialogueTreeViewModel extends StandardViewModel {
  protected profileVM = this.addDependency(ProfileViewModel);
  fade: boolean;

  graph: DialogueGraph;
  nodeOne: DialogueNode;
  nodeTwo: DialogueNode;
  activeNode: DialogueNode;
  node: DialogueNode;

  constructor() {
    super();
    this.fade = false;

    this.graph = new DialogueGraph();
    this.nodeOne = new DialogueNode();
    this.nodeTwo = new DialogueNode();
    this.activeNode = new DialogueNode();
    this.node = new DialogueNode();

    makeObservable(this, {
      graph: observable,
      nodeOne: observable,
      nodeTwo: observable,
      activeNode: observable,
      node: observable,
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
    node!.options = this.removeExtraOption(node!.options!);
    this.graph.initialized = true;
    this.activeNode = node;
  }

  setFade(fade: boolean): void {
    this.fade = !fade;
  }

  initializeGraph(): void {
    // parse SHDW JSON url
    // this.populateGraphFromJSON(shdwUrl);
    this.nodeOne._id = '1';
    this.nodeOne.content =
      'So, I heard you are looking for something...the question is, what are you willing to pay for the fabled Compression Tool?';
    this.nodeOne.addOption({
      text: 'Why do you think I am here?',
      targetNodeId: '2',
    } as DialogueOptions);
    this.nodeOne.addOption({
      text: 'What is this supposed to be some kind of game?',
      targetNodeId: '3',
    } as DialogueOptions);
    this.nodeOne.addOption({
      text: 'Just give me the Compression Tool',
      targetNodeId: '4',
    } as DialogueOptions);
    this.nodeOne.addOption({
      text: 'Sorry, I am from out of town...',
      targetNodeId: '5',
    } as DialogueOptions);

    this.nodeTwo._id = '2';
    this.nodeTwo.content = `You are a funny one ${this.profileVM.domainName}. Confused yet? Good! You should be. State compression 
    is a complex topic, but once you find the 4 Keys of State Compression, you will be able to compress your NFTs and save 
    your planet from high fees.`;
    this.nodeTwo.addOption({
      text: 'Find the Merkel Core',
      targetNodeId: '1',
    } as DialogueOptions);

    this.graph.addNode(this.nodeOne);
    this.graph.addNode(this.nodeTwo);

    const nextNode = this.graph.selectOption('1', 0);
    if (!this.graph.initialized) {
      this.setActiveNode(this.graph.nodes.get('1')!);
    }
  }

  populateGraphFromJSON(jsonData: DialogueData) {
    for (const dialogue of jsonData) {
      this.node._id = dialogue.id;
      this.node.content = dialogue.content;

      for (const option of dialogue.options) {
        this.node.addOption({
          text: option.text,
          targetNodeId: option.targetNodeId,
        } as DialogueOptions);
      }

      this.graph.addNode(this.node);
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
