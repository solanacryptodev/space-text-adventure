import { observer } from 'mobx-react-lite';
import { WorldImageCardProps } from '~/lib/types/globalTypes';

export const WorldImageCard = observer(
  ({ worldImage, storyAltText, imageCaption }: WorldImageCardProps) => {
    return (
      <figure className="relative shadow-xl shadow-black-500/50 overflow-hidden max-w-lg max-h-lg transition-all duration-300 cursor-pointer filter">
        <img className="rounded-lg w-fit h-fit" src={worldImage} alt={storyAltText} />
        <div className="absolute inset-0 bg-black opacity-60" />
        <figcaption className="absolute px-4 text-lg text-white bottom-6 hover:bg-[#FF7F50] rounded-r-md transition duration-75">
          <p>{imageCaption}</p>
        </figcaption>
      </figure>
    );
  }
);
