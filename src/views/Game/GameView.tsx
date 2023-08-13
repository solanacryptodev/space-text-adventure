import { observer } from 'mobx-react-lite';
// import { Transition } from '@tailwindui/react';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { GameViewDialogue } from '~/views/Game/GameViewDialogue/GameViewDialogue';
import { DialogueTreeViewModel } from '~/viewmodels/DialogueTree/DialogueTreeViewModel';
import { nanoid } from 'nanoid';
import { PlayButton } from '~/components/common/buttons/PlayButton';
import { useShadowDrive } from '~/hooks/useShadowDrive';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { demoDialogueOptions } from '~/lib/mockData';
import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const GameView = observer(() => {
  const dialogueVM = useViewModel<DialogueTreeViewModel>(DialogueTreeViewModel);
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const { editInventoryShdwFile } = useShadowDrive();
  const { connection } = useConnection();
  const wallet = useWallet();
  // const {  } = useAnchorWallet();

  const handlePlayerData = async () => {
    // const characterFile = await getFilesFromStorage(
    //   connection,
    //   wallet,
    //   `opos_game_dialogue_data.json`
    // );
    // console.log('characterFile: ', profileVM.storageUrl);

    // const uploadGameFile = await uploadGameData(connection, wallet, demoDialogueOptions);

    await editInventoryShdwFile(
      connection,
      wallet,
      `https://shdw-drive.genesysgo.net/AWjnok2j7Nfa6BpFg34UhTQsAZ63g7ctSQpqi8MKTkME/opos_game_dialogue_data.json`,
      demoDialogueOptions,
      'v2'
    );
  };

  if (!dialogueVM.activeNode) return null;

  return (
    <div className="antialiased bg-gradient-to-b from-[#151B25] to-[#000000] dark:bg-gray-900">
      <div className="relative flex h-full w-full flex-1">
        <main className="h-screen overflow-y-auto dark:bg-gray-900 w-full flex-1 p-4 flex flex-col items-stretch space-y-4 lg:mx-64 pt-20 lg:pt-4">
          {dialogueVM.graph.initialized && (
            <GameViewDialogue
              key={nanoid()}
              id={dialogueVM.activeNode._id}
              text={dialogueVM.activeNode.content}
              options={dialogueVM.activeNode.options}
            />
          )}
        </main>

        <aside
          className="fixed top-0 right-0 z-40 w-64 h-screen pt-20 lg:pt-0 transition-transform translate-x-full bg-[#1f2933] lg:!translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Profilebar"
          id="user-drawer"
        >
          <div className="overflow-y-auto py-5 px-3 h-full dark:bg-gray-800">
            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 rounded-full"
                src={profileVM.profilePicture || '/bdbcoin.jpg'}
                alt="user"
              />
              <div className="mt-2 text-center">
                <h3 className="font-bold text-xl text-white dark:text-white">
                  {profileVM.domainName}
                </h3>
                <p className="dark:text-gray-400 text-white">OPOS Hackathon Demo</p>
              </div>

              <button
                type="button"
                onClick={handlePlayerData}
                className="my-5 w-full flex items-center justify-center py-1.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 dark:text-white mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>

              <PlayButton />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
});
