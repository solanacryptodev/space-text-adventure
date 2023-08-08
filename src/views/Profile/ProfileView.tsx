import React, { JSX } from 'react';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { GUM_TLD_ACCOUNT, GumNameService, useGumContext } from '@gumhq/react-sdk';
import { PublicKey } from '@solana/web3.js';
import { LandingHeaderView } from '~/views/Landing/LandingHeader/LandingHeaderView';
import { LandingSidebarView } from '~/views/Landing/LandingSidebar/Sidebar';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { observer } from 'mobx-react-lite';
import { WalletModel } from '~/models/Wallet/WalletModel';
import { CharacterCreationViewModel } from '~/viewmodels/CharacterCreation/CharacterCreationViewModel';
import { useShadowDrive } from '~/hooks/useShadowDrive';
import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const ProfileView = observer((): JSX.Element => {
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const walletVM = useViewModel<WalletModel>(WalletModel);
  const characterVM = useViewModel<CharacterCreationViewModel>(CharacterCreationViewModel);
  // const connection = useConnection();
  const walletSet = useAnchorWallet();
  const walletConnect = useWallet();
  const { sdk } = useGumContext();
  // const { getFilesFromWorldStorage } = useShadowDrive();
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

  if (walletConnect.connected) {
    verifyDomain().then();
  }

  return (
    <div className="antialiased bg-gradient-to-b from-[#151B25] to-[#000000] dark:bg-gray-900">
      {/* Header */}
      <LandingHeaderView />

      {/* Sidebar */}
      <LandingSidebarView />

      {/* Main Section */}
      <main className="p-4 md:ml-64 h-screen pt-20">
        <div className="relative flex items-center justify-center h-full">
          <div className="bg-[#BBC8DE] rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => profileVM.backToHome()}
              className="relative top-3 text-gray-400 bg-transparent hover:bg-[#FF7F50] hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create new Gum Domain and Character
              </h3>
              <form className="space-y-6" action="#">
                {profileVM.verified ? (
                  <div>
                    <label
                      htmlFor="domainVerified"
                      className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                    >
                      Your Domain Name Already Exists
                    </label>
                    <input
                      id="domainVerified"
                      type="text"
                      value={profileVM.domainName}
                      placeholder={profileVM.domainName}
                      disabled
                      className="bg-gray-400 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="domainUnverified"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Domain Name
                    </label>
                    <input
                      id="domainUnverified"
                      type="text"
                      value={profileVM.domainName}
                      onChange={(event) => profileVM.setDomainName(event.target.value)}
                      placeholder="Enter Domain Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                )}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                {profileVM.verified ? (
                  <button
                    className="bg-[#FF7F50]"
                    onClick={async (event) => {
                      event.preventDefault();
                      const nameService = new GumNameService(sdk);

                      const screenName = await nameService.getOrCreateDomain(
                        GUM_TLD_ACCOUNT,
                        profileVM.domainName,
                        walletSet?.publicKey as PublicKey
                      );
                      console.log(`screenName: ${screenName}`);
                    }}
                  >
                    Create Character
                  </button>
                ) : (
                  <button
                    className="bg-[#FF7F50]"
                    onClick={async (event) => {
                      event.preventDefault();
                      const nameService = new GumNameService(sdk);

                      const screenName = await nameService.getOrCreateDomain(
                        GUM_TLD_ACCOUNT,
                        profileVM.domainName,
                        walletSet?.publicKey as PublicKey
                      );
                      console.log(`screenName: ${screenName}`);
                    }}
                  >
                    Create Domain and Character
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
