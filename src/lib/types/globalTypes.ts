import { ReactNode } from 'react';
import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';

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

export interface WalletContextProvider {
  children: ReactNode;
  endpoint: string;
  network: WalletAdapterNetwork;
  wallets?: Adapter[];
}
