import { action, computed, makeObservable, observable } from 'mobx';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWalletModal, WalletModalContextState } from '@solana/wallet-adapter-react-ui';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { singleton } from 'tsyringe';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class WalletModel extends StandardViewModel {
  wallet: WalletContextState;
  walletModal: WalletModalContextState;
  walletAdapters: Adapter[];
  connected: boolean;

  constructor() {
    super();
    this.walletAdapters = [];
    this.connected = false;
    this.wallet = useWallet();
    this.walletModal = useWalletModal();

    makeObservable(this, {
      walletAdapters: observable,
      connected: observable,
      wallet: observable,
      walletModal: observable,

      setShowWalletModal: action.bound,

      isConnected: computed,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInitialize(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  get isConnected(): boolean {
    console.log('is connected?: ', this.wallet.connected);
    return this.wallet.connected;
  }

  async setShowWalletModal(): Promise<void> {
    try {
      if (!this.wallet.connected) {
        this.walletModal.setVisible(true);
      }
    } catch (error) {
      console.log('error with wallet:', error);
    }
  }
}
