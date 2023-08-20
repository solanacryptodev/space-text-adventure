import { observer } from 'mobx-react-lite';
import { ProfileViewModel } from '~/viewmodels/Profile/ProfileViewModel';
import { GameViewDialogue } from '~/views/Game/GameViewDialogue/GameViewDialogue';
import { DialogueGraphViewModel } from '~/viewmodels/DialogueGraph/DialogueGraphViewModel';
import { nanoid } from 'nanoid';
import { PlayButton } from '~/components/common/buttons/PlayButton';
import { TipJar } from '~/components/common/forms/TipJar';
import { CompressionViewModel } from '~/viewmodels/Compression/CompressionViewModel';
import { useRouter } from 'next/router';
import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const GameView = observer(() => {
  const dialogueVM = useViewModel<DialogueGraphViewModel>(DialogueGraphViewModel);
  const compressionVM = useViewModel<CompressionViewModel>(CompressionViewModel);
  const profileVM = useViewModel<ProfileViewModel>(ProfileViewModel);
  const router = useRouter();

  const handlePlayerData = async () => {
    router.push({
      pathname: '/',
    });
  };

  if (!dialogueVM.activeNode) return null;
  const url = `https://explorer.solana.com/tx/${compressionVM.txID}`;

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
          <div className="items-center justify-center">
            {compressionVM.txID.length > 1 && (
              <div className="p-2 bg-[#90EE90] border-b-green-600 text-black text-center">
                <div className="font-bold">cNFT Transaction ID: </div>
                <a className="underline" href={url} target="_blank" rel="noopener noreferrer">
                  {compressionVM.txID}
                </a>
              </div>
            )}
          </div>
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

              <div className="pb-1.5">
                <p className="text-red-600">
                  Demo Note: Please use Solflare wallet for testing cNFT minting. All other wallets
                  fail to simulate the instruction transaction. Known issue.
                </p>
              </div>

              <div className="pb-1">
                <p className="text-white pb-1">Leave a tip if you so desire, thank you.</p>
                <TipJar />
              </div>

              <PlayButton />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
});
