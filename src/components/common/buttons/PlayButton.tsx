import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import useSound from 'use-sound';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const PlayButton = observer((): JSX.Element => {
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const landingSoundtrack = '/sounds/mandala_dreams.mp3';
  const [play, { stop }] = useSound(landingSoundtrack, { volume: 0.15 });

  if (profileVM.musicPlaying) {
    play();
  } else {
    stop();
  }
  return (
    <div>
      {profileVM.musicPlaying ? (
        <button
          type="button"
          data-dropdown-toggle="language-dropdown"
          onClick={() => profileVM.toggleMusic()}
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-white-900 hover:bg-black dark:hover:bg-gray-600"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FF7F50"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9 13a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0v6Zm4 0a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0v6Z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          data-dropdown-toggle="language-dropdown"
          onClick={() => profileVM.toggleMusic()}
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-white-900 hover:bg-black dark:hover:bg-gray-600"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FF7F50"
            viewBox="0 0 14 16"
          >
            <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
          </svg>
        </button>
      )}
    </div>
  );
});
