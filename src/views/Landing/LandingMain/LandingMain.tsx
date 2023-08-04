import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCard } from '~/components/common/cards/WorldPreviewCard';
import { useProfileCreate } from '~/hooks/useCreateProfile';
import { useShadowDrive } from '~/hooks/useShadowDrive';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useShadowStorage } from '@gumhq/react-sdk';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const LandingMain = observer((): JSX.Element => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const { createProfile } = useProfileCreate();
  // const { createStorageAccount } = useShadowStorage(connection);
  // const { createStorageAccount } = useShadowDrive();
  const walletVM = useViewModel<WalletModel>(WalletModel);
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);

  const handleCreateProfile = async () => {
    const domainName = 'brian';
    const profileName = 'janus';
    const setPublicKey = String(publicKey);

    console.log('wallet in View: ', wallet);
    await createProfile(domainName, profileName, setPublicKey, wallet);
  };

  const handleCreateStorageAcct = async () => {
    await profileVM.createStorageAccount('OPOS_DEMO', '10MB', 'v2', wallet, connection);
  };

  if (walletVM.isConnected) {
    const verifyJoinedGame = async () => {
      // await getFilesFromWorldStorage(publicKey!.toString());
    };
    // if no profile with that publicKey exists
    // uploadFilesToWorldStorage(publicKey!.toString()).then();
  }

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">
          <button className="bg-white" onClick={() => handleCreateStorageAcct()}>
            Click
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 mb-4">
        <WorldPreviewCard
          worldName="OPOS"
          storyName="The Legend of the Builders"
          storyImage="/spaceship-md.jpeg"
          storyAltText="The Legend of the Builders Story"
          storyDescription="This is a legend of a brave group of builders who built something that was only possible on Solana"
          publicKey={publicKey?.toString()}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
      </div>
    </main>
  );
});
