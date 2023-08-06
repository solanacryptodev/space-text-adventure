import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCard } from '~/components/common/cards/WorldPreviewCard';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { WorldImageCard } from '~/components/common/cards/WorldImageCard';
import { demoPreviewCards, demoTextCards } from '~/lib/mockData';
import { nanoid } from 'nanoid';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { BasicTextCard } from '~/components/common/cards/BasicTextCard';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const LandingMain = observer((): JSX.Element => {
  const wallet = useAnchorWallet();
  const walletsConnection = useWallet();
  const { connection } = useConnection();
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const walletVM = useViewModel<WalletModel>(WalletModel);

  if (walletsConnection.connected) {
    walletVM.setPublicKey(wallet!.publicKey.toString()).then();
  } else if (!walletsConnection.connected) {
    walletVM.setPublicKey('').then();
  }

  const handleCreateStorage = async () => {
    await profileVM.createStorageAccount(
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
        {demoPreviewCards.map((cards) => (
          <div
            key={nanoid()}
            className="flex flex-col items-center justify-center rounded-lg dark:border-gray-600 h-32 md:h-64"
          >
            <WorldImageCard
              worldImage={cards.worldImage}
              imageCaption={cards.imageCaption}
              storyAltText={cards.storyAltText}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg dark:border-gray-600 mb-4">
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
        {demoTextCards.map((cardData) => (
          <div
            key={nanoid()}
            className="flex items-center justify-center border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
          >
            <BasicTextCard cardHeader={cardData.cardHeader} cardBodyText={cardData.cardBodyText} />
          </div>
        ))}
      </div>
    </main>
  );
});
