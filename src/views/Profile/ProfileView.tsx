import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { useWallet } from '@solana/wallet-adapter-react';
import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const ProfileView = observer((): JSX.Element => {
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const wallet = useWallet();

  const createProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    profileVM.setPublicKey(wallet.publicKey?.toString());
    profileVM.submitProfileToModel();
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={createProfile}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="domainName"
            id="domainName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(event) => {
              profileVM.setDomainName(event.target.value);
            }}
          />
          <label
            htmlFor="domainName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Domain Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="screenName"
            id="screenName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(event) => {
              profileVM.setProfileName(event.target.value);
            }}
          />
          <label
            htmlFor="screenName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Profile Name
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      );
    </>
  );
});
