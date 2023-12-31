import { ReactNode } from 'react';
import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { DialogueOptions } from '~/viewmodels/DialogueGraph/DialogueOptions';
import { Effects } from '~/lib/types/gameEffects';

export interface WorldPreviewCardProps {
  worldName?: string;
  storyName?: string;
  storyDescription?: string;
  storyImage?: string;
  storyAltText?: string;
  publicKey?: string;
}

export interface WorldImageCardProps {
  worldImage?: string;
  storyAltText?: string;
  imageCaption?: string;
}

export interface TextCardProps {
  cardHeader?: string;
  cardBodyText?: string;
}

export interface Characters {
  characterName: string;
  characterAge?: number | string;
}

export interface CharacterAndProfileData {
  gumProfileDomain: string;
  characters: Characters[];
  inventory: string[];
}

export interface NFTMetadata {
  description: string;
  image: string;
  external_url: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    },
    {
      trait_type: string;
      value: string;
    },
    {
      trait_type: string;
      value: string;
    },
  ];
  properties: {
    files: [
      {
        uri: string;
        type: string;
      },
    ];
  };
}

export interface iDialogueOptions {
  id: string;
  text: string;
}

export interface DialogueTree {
  id?: number | string;
  text?: string;
  options?: DialogueOptions[];
  goTo?: (choice: number) => DialogueTree;
}

export interface GameViewDialogueProps {
  dialogue?: string;
  dialogueOptions?: DialogueTree[];
}

export interface WalletContextProvider {
  children: ReactNode;
  endpoint: string;
  network: WalletAdapterNetwork;
  wallets?: Adapter[];
}

interface DialogueOptionData {
  text: string;
  targetNodeId?: string;
  effects?: Effects;
}

interface DialogueNodeData {
  id: string;
  content: string;
  options: DialogueOptionData[];
}

export type DialogueData = DialogueNodeData[];
