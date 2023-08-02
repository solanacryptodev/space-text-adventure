import { JSX } from 'react';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCardProps } from '~/lib/types/globalTypes';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const WorldPreviewCard = observer(
  ({
    worldName,
    storyName,
    storyDescription,
    storyImage,
    storyAltText,
  }: WorldPreviewCardProps): JSX.Element => {
    const walletModel = useViewModel<WalletModel>(WalletModel);

    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={storyImage} alt={storyAltText} />
        </a>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {storyName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{storyDescription}</p>
          <a
            href="#"
            onClick={() => walletModel.setShowWalletModal()}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FF7F50] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create a Character
          </a>
        </div>
      </div>
    );
  }
);
