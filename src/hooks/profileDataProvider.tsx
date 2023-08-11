import { FC } from 'react';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { GumNameService, useGumContext } from '@gumhq/react-sdk';
import { useShadowDrive } from '~/hooks/useShadowDrive';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useViewModel } from '../../reactReactive/viewmodels/useViewModel';

interface SessionProviderProps {
  children: React.ReactNode;
}

const ProfileDataProvider: FC<SessionProviderProps> = ({ children }) => {
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const walletVM = useViewModel<WalletModel>(WalletModel);
  const { sdk } = useGumContext();
  const { getFilesFromStorage } = useShadowDrive();
  const anchorWallet = useAnchorWallet();
  const basicWallet = useWallet();
  const connection = useConnection();
  const gum = new GumNameService(sdk);

  const verifyDomain = async () => {
    const domainName = await gum
      .getNameservicesByAuthority(walletVM.wallet)
      .then((data) => data.map((domainData) => domainData.name));
    const removedName = domainName.at(0);
    if (domainName.length != 0) {
      profileVM.verifyDomainName(true);
      profileVM.setDomainName(removedName!);
      console.log('domain name found');
    } else {
      console.log('no domain name found');
    }
  };

  const verifyStorage = async (): Promise<void> => {
    await getFilesFromStorage(
      connection.connection,
      anchorWallet,
      `${profileVM.domainName}_Character_Data.json`
    );
  };

  if (basicWallet.connected) {
    verifyDomain().then();
    verifyStorage().then();
  }
  return <div>{children}</div>;
};

export default ProfileDataProvider;
