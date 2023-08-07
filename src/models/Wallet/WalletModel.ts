import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { useWalletModal, WalletModalContextState } from '@solana/wallet-adapter-react-ui';
import { singleton } from 'tsyringe';
import { StandardViewModel } from '../../../reactReactive/viewmodels/StandardViewModel';

@singleton()
export class WalletModel extends StandardViewModel {
  wallet: string;
  walletModal: WalletModalContextState;
  connected: boolean;

  constructor() {
    super();
    this.connected = false;
    this.wallet = '';
    this.walletModal = useWalletModal();

    makeObservable(this, {
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

  // const sessionWallet = useSessionWallet();
  //
  // const targetProgramPublicKey = new PublicKey(GPLSESSION_PROGRAMS['mainnet-beta']);
  // const topUp = true;
  // const expiryInMinutes = 60;

  // const handleCreateProfile = async () => {
  //   const domainName = 'brian';
  //   const profileName = 'janus';
  //
  //   // const session = await sessionWallet.createSession(
  //   //   targetProgramPublicKey,
  //   //   topUp,
  //   //   expiryInMinutes
  //   // );
  //
  //   // console.log('session: ', session?.ownerPublicKey?.toString());
  //   console.log('sessionWallet: ', sessionWallet);
  //   await createProfile(domainName, profileName, setPublicKey, sessionWallet);
  // };
}
