import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCard } from '~/components/common/cards/WorldPreviewCard';
import { useProfileCreate } from '~/hooks/useCreateProfile';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';
import { useWallet } from '@solana/wallet-adapter-react';

export const LandingMain = observer((): JSX.Element => {
  const { createProfile } = useProfileCreate();
  const { publicKey } = useWallet();
  const walletVM = useViewModel<WalletModel>(WalletModel);

  // const handleCreateProfile = async () => {
  //   const domainName = 'brian';
  //   const profileName = 'janus';
  //   const publicKey = walletVM.currentPubKey!;
  //   const wallet = walletVM.wallet.wallet?.adapter;
  //
  //   await createProfile(domainName, profileName, publicKey, wallet);
  // };

  // setTimeout(() => {
  //   handleCreateProfile().then();
  // }, 5000);
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
      </div>
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 mb-4">
        <WorldPreviewCard
          storyName="The Legend of the Builders"
          storyImage="/genesys_realms_icon.jpeg"
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
