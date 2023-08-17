import { makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';
import { Pda } from '@metaplex-foundation/js';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class CompressionViewModel extends StandardViewModel {
  merkleTreeAccount: string;
  collectionMint: string;
  collectionTokenAccount: string;
  masterEditionPDA: Pda[];
  mintPDA: Pda[];

  constructor() {
    super();
    this.merkleTreeAccount = '';
    this.collectionMint = '';
    this.collectionTokenAccount = '';
    this.masterEditionPDA = [];
    this.mintPDA = [];

    makeObservable(this, {
      merkleTreeAccount: observable,
      collectionMint: observable,
      collectionTokenAccount: observable,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}
}
