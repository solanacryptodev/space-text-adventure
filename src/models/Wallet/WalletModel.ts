import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWalletModal, WalletModalContextState } from '@solana/wallet-adapter-react-ui';
import { singleton } from 'tsyringe';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class WalletModel extends StandardViewModel {
  profileVM = this.addDependency(ProfileViewModel);
  wallet: string;
  walletModal: WalletModalContextState;
  walletAdapters: Adapter[];
  connected: boolean;

  constructor() {
    super();
    this.walletAdapters = [];
    this.connected = false;
    this.wallet = '';
    this.walletModal = useWalletModal();

    makeObservable(this, {
      walletAdapters: observable,
      connected: observable,
      wallet: observable,
      walletModal: observable,

      setPublicKey: action.bound,

      isConnected: computed,
    });
  }

  protected onInitialize(): void {
    this.createReactions();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onEnd(): void {}

  protected createReactions(): void {
    this.addReaction(
      autorun(() => {
        if (this.wallet.length > 0) {
          this.connected = true;
          console.log('connected: ', this.wallet);
        } else if (this.wallet.length === 0) {
          this.walletModal.setVisible(true);
        }
      })
    );
  }

  get isConnected(): boolean {
    return this.connected;
  }

  async setPublicKey(publicKey: string): Promise<void> {
    this.wallet = publicKey;
  }
}
