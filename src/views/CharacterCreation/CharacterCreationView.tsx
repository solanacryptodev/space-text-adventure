import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { CharacterCreationViewModel } from '~/viewmodels/CharacterCreation/CharacterCreationViewModel';
import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const CharacterCreationView = observer((): JSX.Element => {
  const characterCreationVM = useViewModel<CharacterCreationViewModel>(CharacterCreationViewModel);

  return (
    <div>
      <label
        htmlFor="character"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Character Name
      </label>
      <input
        type="text"
        name="character"
        id="character"
        placeholder="Enter Character Name"
        onChange={(event) => characterCreationVM.setCharacterName(event.target.value)}
        value={characterCreationVM.characterName}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
      />

      <label
        htmlFor="characterAge"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Character's Age
      </label>
      <input
        type="number"
        name="characterAge"
        id="characterAge"
        placeholder="Enter Character Age"
        onChange={(event) => characterCreationVM.setCharacterAge(event.target.value)}
        value={characterCreationVM.characterAge}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
      />
    </div>
  );
});
