import { observer } from 'mobx-react-lite';
import { DialogueTree } from '~/lib/types/globalTypes';
import { GameViewDialogueOptions } from '~/views/Game/GameViewDialogue/GameViewDialogueOptions';
import { DialogueGraphViewModel } from '~/viewmodels/DialogueGraph/DialogueGraphViewModel';
import { nanoid } from 'nanoid';
import { useCompressionMachine } from '~/hooks/useCompressionMachine';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const GameViewDialogue = observer(({ text, options }: DialogueTree) => {
  const dialogueVM = useViewModel<DialogueGraphViewModel>(DialogueGraphViewModel);
  const { mintCompressedNFT } = useCompressionMachine();
  const wallet = useWallet();
  const connection = useConnection();

  const handleOptionClick = async (index: number) => {
    const nextNode = dialogueVM.graph.selectOption(dialogueVM.activeNode?.id || '', index);

    if (dialogueVM.getMintEffect) {
      await mintCompressedNFT(connection.connection, wallet!);
    }

    dialogueVM.setActiveNode(nextNode!);
    dialogueVM.setFade(true);
  };

  return (
    <>
      <div className="flex items-center justify-center transition-opacity rounded-xl dark:border-gray-600 h-96">
        <a
          href="#"
          className="block w-full h-full p-6 bg-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {text}
          </h5>
        </a>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {options!.map((option, index) => (
          <button
            className="cursor-pointer select-none transition-all duration-100 ease-in-out transform hover:scale-105"
            onClick={() => handleOptionClick(index)}
            key={nanoid()}
          >
            <GameViewDialogueOptions key={option.id} id={option.targetNodeId} text={option.text} />
          </button>
        ))}
      </div>
    </>
  );
});
