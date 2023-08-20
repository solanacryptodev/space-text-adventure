import { action, computed, makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';
import { Pda } from '@metaplex-foundation/js';
import { DialogueGraphViewModel } from '~/viewmodels/DialogueGraph/DialogueGraphViewModel';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class CompressionViewModel extends StandardViewModel {
  protected dialogueVM = this.addDependency(DialogueGraphViewModel);
  merkleTreeAccount: string;
  collectionMint: string;
  collectionTokenAccount: string;
  masterEditionPDA: Pda[];
  mintPDA: Pda[];
  demoKey: Uint8Array;
  txID: string;

  constructor() {
    super();
    this.merkleTreeAccount = '';
    this.collectionMint = '';
    this.collectionTokenAccount = '';
    this.masterEditionPDA = [];
    this.mintPDA = [];
    this.demoKey = new Uint8Array();
    this.txID = '';

    makeObservable(this, {
      merkleTreeAccount: observable,
      collectionMint: observable,
      collectionTokenAccount: observable,
      txID: observable,

      setKey: action.bound,
      setTxID: action.bound,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {
    this.setKey();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  setTxID(txID: string): void {
    this.txID = txID;
  }

  /*
   * This sucks, I know. Keypair was created purely for demo purposes and isn't used in any other context. For purposes
   *  of time, I needed to limit the scope of the project. This is a demo key.
   * */
  setKey() {
    this.demoKey = new Uint8Array([
      10, 202, 77, 192, 80, 187, 60, 132, 144, 132, 253, 52, 64, 42, 240, 20, 37, 0, 130, 128, 76,
      161, 46, 197, 101, 229, 226, 236, 52, 3, 38, 145, 173, 204, 28, 175, 101, 171, 56, 41, 83, 46,
      94, 211, 175, 7, 160, 217, 210, 73, 205, 252, 96, 82, 102, 225, 233, 73, 217, 58, 143, 173,
      135, 29,
    ]);
  }
}
