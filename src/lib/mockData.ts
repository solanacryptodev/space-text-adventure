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
      "But you'll need the Armor of Compression and Armor of SOL if you want to stand a chance against them.' He waits for your " +
      "response and after a moment of silence he says, 'The Armor of Compression is located in the compound itself. The Armor of " +
      "SOL, in the building next to it. Convenient huh! Well, what do you say?'",
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
    content:
      'Of course you do! The Armor of SOL was designed to be worn by the most powerful warriors in the galaxy. The veterans of the ' +
      'Blockchain Wars. That armor has been battle-tested in every conflict from the Battle of the Downtime to the Battle of the Memes! ' +
      'My parents told me the ETH army lost because they were just too slow and their equipment cost too much money to continue fighting. ' +
      'The Armor of Compression will bring you technological advancement, but the Armor of SOL will bring you victory!',
    options: [
      {
        text: 'Journey to the facility holding the Armor of SOL',
        targetNodeId: '7',
      },
    ],
  },
  {
    id: '7',
    content:
      "Once near the facility, you notice an android guard standing watch. In a real game, you'd have multiple options to proceed. " +
      'But this is a demo, so you only have one option. You decide to use the invisibility device you were given by the town leader. ' +
      'Sneaking past the android guard is ideal to avoid a larger fight.',
    options: [
      {
        text: 'Use the invisibility device to sneak into the facility',
        targetNodeId: '8',
      },
    ],
  },
  {
    id: '8',
    content:
      'Once inside, you see the Armor of SOL, as well as a patrol of androids. You must act quickly. What do you do?',
    options: [
      {
        text: 'Fight the android guards',
        targetNodeId: '9',
      },
    ],
  },
  {
    id: '9',
    content:
      'BAM! The last android crashes to the ground. You are victorious! You can now mint the Armor of SOL. May it bring ' +
      'you victory in your future battles.',
    options: [
      {
        text: 'Mint the Armor of SOL',
        effects: {
          mintNFT: true,
        },
      },
      {
        text: 'Return to town leader',
        targetNodeId: '1',
      },
    ],
  },
  {
    id: '10',
    content:
      "'Of course you do! But before you seek the Armor of Compression, you must understand why it was built in the first place. " +
      'Years ago, on the planet SOL, the cost to mint an NFT was much higher than it is today. While cheaper than all other blockchains ' +
      'it still presented problems at scale. So some smart engineers built the state compression program using merkle trees to create a hash ' +
      'of each piece of data (the leaf). All of the leaves are then hashed together to create a single hash (the root) that is stored ' +
      "on-chain.'",
    options: [
      {
        text: 'Journey to the location of the Armor of Compression',
        targetNodeId: '11',
      },
    ],
  },
  {
    id: '11',
    content:
      "'Now each time a cNFT is minted, the root hashed is updated. The Solanans loved the root hash of this one particular " +
      'merkle tree so much that they made the constantly updated root the encrypted entry into the security compound that the ' +
      "androids now guard.' The town leader hands you a piece of paper with the root hash on it. 'You'll need this to enter the compound. " +
      "Remember, this is only a demo, in a real game I wouldn't have been so nice to just hand this over to you.'",
    options: [
      {
        text: 'You fight your way past the androids and enter the facility',
        targetNodeId: '12',
      },
    ],
  },
  {
    id: '12',
    content:
      'Inside the facility you see rows and rows of shipment containers. After searching for hours and almost giving up, you come ' +
      'across a shipment container with the words "Armor of Compression" written on it. You try to open it, but it is locked. Luckily, ' +
      'because this is only a demo, I, the Game Master, hereby grant you awesome hacking skills.',
    options: [
      {
        text: 'Hack the shipment container.',
        targetNodeId: '13',
      },
    ],
  },
  {
    id: '13',
    content:
      'In a real game with a combat system, there would be an elaborate battle between you and the androids to get the armor. ' +
      'But this is a demo, so you should know that you defeated the androids and can claim your cNFT below. The sought-after ' +
      'armor shines with a mysterious glow. The mixed reality interface on the armor is erratic and glitchy. So you know the armor ' +
      "is buggy. You will need to take it back to a guy you know who fixes armor like this before it'll display properly. ",
    options: [
      {
        text: 'Mint the Armor of Compression',
        targetNodeId: '1',
        effects: {
          mintNFT: true,
        },
      },
      {
        text: 'Return to town leader',
        targetNodeId: '1',
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
