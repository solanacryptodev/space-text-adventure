import {
  GumProvider,
  SessionWalletProvider,
  UploaderProvider,
  useSessionKeyManager,
} from '@gumhq/react-sdk';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import React from 'react';
import { useGumSDK } from '~/hooks/useGumSDK';

interface GumSDKProviderProps {
  children: React.ReactNode;
}

// The GumSDKProvider component initializes the Gum SDK and SessionKeyManager and provides it to its children via context.
const UseGumSDKProvider: React.FC<GumSDKProviderProps> = ({ children }) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet()!;
  const sdk = useGumSDK();
  const sessionWallet = useSessionKeyManager(anchorWallet, connection, 'mainnet-beta');

  if (!sdk) {
    return null;
  }

  return (
    <GumProvider sdk={sdk}>
      <SessionWalletProvider sessionWallet={sessionWallet}>
        <UploaderProvider uploaderType="genesysgo" connection={connection} cluster="mainnet-beta">
          {children}
        </UploaderProvider>
      </SessionWalletProvider>
    </GumProvider>
  );
};

export default UseGumSDKProvider;
