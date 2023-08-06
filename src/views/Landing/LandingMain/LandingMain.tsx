import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCard } from '~/components/common/cards/WorldPreviewCard';
import { useShadowDrive } from '~/hooks/useShadowDrive';
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { ProfileView } from '~/views/Profile/ProfileView';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const LandingMain = observer((): JSX.Element => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { createStorageAccount } = useShadowDrive();
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);

  const handleCreateStorage = async () => {
    await createStorageAccount(
      profileVM.storageName,
      profileVM.storageSize,
      profileVM.version,
      wallet,
      connection
    );
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64" />
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">
          <ProfileView />
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">
          <input
            type="text"
            value={profileVM.storageName}
            onChange={(event) => profileVM.setStorageName(event.target.value)}
          />
          <input
            type="text"
            value={profileVM.storageSize}
            onChange={(event) => profileVM.setStorageSize(event.target.value)}
          />
          <button className="bg-white" onClick={() => handleCreateStorage()}>
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
          publicKey={wallet?.publicKey.toString()}
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
