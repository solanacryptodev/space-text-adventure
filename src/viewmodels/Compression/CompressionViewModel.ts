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
      105, 128, 151, 194, 95, 24, 105, 160, 89, 237, 248, 180, 26, 2, 164, 62, 45, 77, 91, 100, 61,
      38, 155, 33, 41, 70, 49, 193, 204, 16, 59, 50, 53, 184, 206, 213, 70, 180, 206, 107, 158, 158,
      64, 246, 203, 233, 197, 79, 4, 38, 71, 69, 168, 163, 105, 33, 132, 62, 179, 176, 48, 154, 115,
      208,
    ]);
  }
}
