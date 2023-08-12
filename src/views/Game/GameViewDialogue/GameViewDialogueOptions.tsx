import { observer } from 'mobx-react-lite';
import { iDialogueOptions } from '~/lib/types/globalTypes';

export const GameViewDialogueOptions = observer(({ id, text }: iDialogueOptions) => {
  return (
    <div key={id} className="flex flex-wrap">
      <div key={id} className="w-[450px] rounded-xl dark:border-gray-600 h-[90px] mr-4 mb-4">
        <a
          href="#"
          className="block pt-4 pb-2.5 bg-gradient-to-b from-[#BBC8DE] to-[#52688F] rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {text}
          </h5>
        </a>
      </div>
    </div>
  );
});
