import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { WorldPreviewCardProps } from '~/lib/types/globalTypes';
import { CharacterCreationViewModel } from '~/viewmodels/CharacterCreation/CharacterCreationViewModel';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const WorldPreviewCard = observer(
  ({
    worldName,
    storyName,
    storyDescription,
    storyImage,
    storyAltText,
  }: WorldPreviewCardProps): JSX.Element => {
    const characterCreateVM = useViewModel<CharacterCreationViewModel>(CharacterCreationViewModel);

    return (
      <div className="max-w-full bg-[#BBC8DE] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={storyImage} alt={storyAltText} />
        </a>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
            {`${worldName}: ${storyName}`}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{storyDescription}</p>
          <div className="flex flex-row justify-between">
            <a
              href="#"
              onClick={() => characterCreateVM.displayCharacterCreateModal(true)}
              className="items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FF7F50] rounded-lg hover:bg-[#151B25] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create a Character
            </a>
            <a
              href="#"
              onClick={() => characterCreateVM.validatePlayerCharacter()}
              className="items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FF7F50] rounded-lg hover:bg-[#151B25] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Game
            </a>
          </div>
        </div>
      </div>
    );
  }
);
