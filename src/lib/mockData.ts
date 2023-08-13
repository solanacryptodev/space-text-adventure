import { DialogueData, TextCardProps, WorldImageCardProps } from '~/lib/types/globalTypes';

export const demoPreviewCards: WorldImageCardProps[] = [
  {
    worldImage: '/land_beyond_time_md.jpeg',
    imageCaption: 'The Land Beyond Time: DEMO',
    storyAltText: 'an AI-generated psychedelic environment',
  },
  {
    worldImage: '/fantasy_cottage_md.jpeg',
    imageCaption: 'The Traveler: DEMO',
    storyAltText: 'an AI-generated cottage on a hill',
  },
  {
    worldImage: '/the_monarch_md.jpeg',
    imageCaption: 'The Monarch: DEMO',
    storyAltText: 'an AI-generated man in a woven hoodie',
  },
  {
    worldImage: '/the_race_md.jpeg',
    imageCaption: 'The Dangerous Race: DEMO',
    storyAltText: 'an AI-generated car racing on a night street',
  },
];

export const demoTextCards: TextCardProps[] = [
  {
    cardHeader: 'Introducing Genesys Realms',
    cardBodyText:
      'Genesys Realms is a vision of a future for interactive fiction. A merger of reactive storytelling and gaming powered ' +
      'by the Solana blockchain. In the near future, you will be able to come to this website and launch your own Game Realm. ' +
      'A Game Realm is a unique world in which you, the Game Master, will define the ',
  },
  {
    cardHeader: 'Powered by the Hermes Game Engine',
    cardBodyText:
      'The Hermes Game Engine is a conceptual Solana program that will empower players through the formation of on-chain ' +
      'Game Realms leveraging compressed NFTs as game objects. The H.G.E. will introduce the concept of text-based, reactive ' +
      'interactive storytelling using the most recent advancements in software technology to usher in a new era of fictionalized ' +
      'social interactions. The H.G.E. in its current form leverages tools such as Gum Domains, Shadow Drive and the Metaplex Bubblegum ' +
      'state compression program to provide a small taste of what is possible.',
  },
  {
    cardHeader: 'Reactive Interactive Fiction on Solana',
    cardBodyText:
      'Genesys Realms, along with the Hermes Game Engine, exemplifies Only Possible On Solana',
  },
  {
    cardHeader: 'Begin Your Journey',
    cardBodyText: 'Create a character and join the game',
  },
];

/* Index signature I never used */
export interface OposGameData {
  [key: string]: {
    [dataKey: string]: string;
  };
}

export const demoDialogueOptions: DialogueData = [
  {
    id: '1',
    content:
      'So, I heard you are looking for something...the question is, what are you willing to pay for the fabled ' +
      'Compression Tool?',
    options: [
      {
        text: 'Why do you think I am here?',
        targetNodeId: '2',
      },
      {
        text: 'What is this supposed to be some kind of game?',
        targetNodeId: '2',
      },
      {
        text: 'Just give me the Compression Tool',
        targetNodeId: '2',
      },
      {
        text: 'Sorry, I am from out of town...',
        targetNodeId: '2',
      },
    ],
  },
  {
    id: '2',
    content:
      'You are a funny one. Confused yet? Good! You should be. State compression ' +
      'is a complex topic, but once you find the 4 Keys of State Compression, you will be able to compress your NFTs ' +
      'and save your planet from high fees.',
    options: [
      {
        text: 'Find the Merkel Core',
        targetNodeId: '1',
      },
      {
        text: 'Find the Solana Scepter',
        targetNodeId: '1',
      },
    ],
  },
];
