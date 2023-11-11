import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { TextCardProps } from '~/lib/types/globalTypes';

export const BasicTextCard = observer(
  ({ cardHeader, cardBodyText }: TextCardProps): JSX.Element => {
    return (
      <div className="flex-1 p-4 md:p-6 h-auto bg-[#BBC8DE] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <a href="#">
          <h5 className="mb-2 text-base md:text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
            {cardHeader}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{cardBodyText}</p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FF7F50] rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Coming Soon
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    );
  }
);
