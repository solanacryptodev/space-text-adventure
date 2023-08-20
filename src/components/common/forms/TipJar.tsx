import { observer } from 'mobx-react-lite';
import { DialogueGraphViewModel } from '~/viewmodels/DialogueGraph/DialogueGraphViewModel';
import { useHandyInstructions } from '~/hooks/useHandyInstructions';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useViewModel } from '../../../../reactReactive/viewmodels/useViewModel';

export const TipJar = observer(() => {
  const dialogueVM = useViewModel<DialogueGraphViewModel>(DialogueGraphViewModel);
  const { transferSolToGM } = useHandyInstructions();
  const wallet = useAnchorWallet();
  const connection = useConnection();

  return (
    <form>
      <div className="mb-6">
        <label
          htmlFor="tipjar"
          className="block mb-2 text-sm font-medium text-white dark:text-white"
        >
          Your tip amount
        </label>
        <input
          type="text"
          id="tipjar"
          placeholder="The Tip Jar"
          onChange={(event) => dialogueVM.setTipAmount(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        onClick={() => transferSolToGM(connection.connection, wallet!, dialogueVM.tipAmount)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
});
