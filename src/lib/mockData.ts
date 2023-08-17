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
      'A Game Realm is a unique world in which you, the Game Master, will write the narrative that players will interact with and ' +
      'influence. This opens the door to a new era of interactive storytelling for NFT communities on-chain.',
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
      'Genesys Realms, along with the Hermes Game Engine, exemplifies Only Possible On Solana. Interactive Fiction is the oldest ' +
      'form of computer gaming and has been around since the 1970s. The H.G.E. will bring this genre into the 21st century by ' +
      'allowing for real-time interactions between Players and Game Masters in a blockchain-powered sandbox environment. All in text. ' +
      'This will make reactive storytelling the most accessible form of gaming on the Solana blockchain.',
  },
  {
    cardHeader: 'Begin Your Journey',
    cardBodyText:
      'Create a character and join the game. Given this is a demo, there are features missing, but Solana, Gum Domains, ' +
      'and Shadow Drive allowed me to create a limited experience to pique your imagination. I hope you enjoy the demo and ' +
      'look forward to the future of Genesys Realms.',
  },
];

/* Index signature I never used */
export interface OposGameData {
  [key: string]: {
    [dataKey: string]: string;
  };
}

/*  An example of how I built the dialogue data and uploaded to shadow drive manually.
 *  An admin UI will need to be built that handles this.
 * */
export const demoDialogueOptions: DialogueData = [
  {
    id: '1',
    content:
      'A disheveled man who calls himself the town leader walks in and looks at you. He notices how inefficient your armor is and scoffs. ' +
      "'So I hear you're looking for the Compression Tool? You will need it to replace that cheap armor of yours." +
      "I can help you find it, but first, you must clear the compound of androids. They're a nuisance and I need them gone." +
      "But you'll need the Armor of Compression and Armor of SOL if you want to stand a chance against them.'",
    options: [
      {
        text: 'What is the Armor of SOL?',
        targetNodeId: '2',
      },
      {
        text: 'What is the Armor of Compression?',
        targetNodeId: '3',
      },
      {
        text: "Tell me about these androids and the problems they've caused.",
        targetNodeId: '4',
      },
      {
        text: 'Sorry, I am from out of town...',
        targetNodeId: '5',
      },
    ],
  },
  {
    id: '2',
    content:
      'The Armor of SOL is said to have been forged on the planet SOL. Powerful armor that is.',
    options: [
      {
        text: 'I want it',
        targetNodeId: '6',
      },
    ],
  },
  {
    id: '3',
    content:
      'The Armor of Compression is the most sought after armor in the town. It was the armor of the previous owners of the compound ' +
      "and is said to be made of the rarest materials on the planet. It's priceless.",
    options: [
      {
        text: 'I want it',
        targetNodeId: '10',
      },
    ],
  },
  {
    id: '4',
    content:
      'The androids were built by the previous owners of the compound that holds the compression tool. ' +
      "It's a complex history that I don't have the time to go into right now. They were originally meant to simply defend " +
      'the compound, but they have become sentient and are now a threat to the town. They have been attacking our citizens. ',
    options: [
      {
        text: "How's the town defending itself?",
        targetNodeId: '14',
      },
    ],
  },
  {
    id: '5',
    content: 'Go back to your town and stay there. You are not welcome here.',
    options: [
      {
        text: 'Return to town',
        effects: {
          returnHome: true,
        },
      },
    ],
  },
  {
    id: '6',
    content: 'Of course you do!',
    options: [
      {
        text: 'Head to Node 7',
        targetNodeId: '7',
      },
    ],
  },
  {
    id: '7',
    content: 'Of course you do!',
    options: [
      {
        text: 'Head to Node 8',
        targetNodeId: '8',
      },
    ],
  },
  {
    id: '8',
    content: 'Of course you do!',
    options: [
      {
        text: 'Head to Node 9',
        targetNodeId: '9',
      },
    ],
  },
  {
    id: '9',
    content: 'Of course you do!',
    options: [
      {
        text: 'Mint the Armor of SOL',
        effects: {
          mintNFT: true,
        },
      },
    ],
  },
  {
    id: '10',
    content:
      'Of course you do! But before you seek the Armor of Compression, you must understand why it was built in the first place. ' +
      'Years ago, on the planet SOL, transactions were higher than they are today. ',
    options: [
      {
        text: 'Journey to the location of the Armor of Compression',
        targetNodeId: '11',
      },
    ],
  },
  {
    id: '11',
    content: '',
    options: [
      {
        text: 'Journey to the location of the Armor of Compression',
        targetNodeId: '12',
      },
    ],
  },
  {
    id: '12',
    content: '',
    options: [
      {
        text: 'Find the Armor of Compression',
        targetNodeId: '13',
      },
    ],
  },
  {
    id: '13',
    content:
      'In a real game, there would be an elaborate battle between you and the androids to get the armor. ' +
      'But this is a demo, so you should know that you defeated the androids and can claim your cNFT below.',
    options: [
      {
        text: 'Mint the Armor of Compression',
        effects: {
          mintNFT: true,
        },
      },
    ],
  },
  {
    id: '14',
    content:
      "'Defending is barely how I'd describe it. We have a few guards, but they are no match for the androids. " +
      "We've been trying to find the compression tool for years, but we have been unable to find it. " +
      "We're in need of you're help. My town is running out of options and time.'",
    options: [
      {
        text: "That's where the armor comes in?",
        targetNodeId: '15',
      },
    ],
  },
  {
    id: '15',
    content:
      "Yes. The armor will protect you from their attacks. It's not much, but it's better than nothing. ",
    options: [
      {
        text: "So let's start back from the beginning just so I'm clear.",
        targetNodeId: '1',
      },
    ],
  },
];
