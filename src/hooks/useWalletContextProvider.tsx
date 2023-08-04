import React, { useCallback } from 'react';
import { WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { WalletContextProvider } from '~/lib/types/globalTypes';

export const ReactUIWalletModalProviderDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false }
);

export const UseWalletContextProvider = observer(
  ({ children, endpoint, network, wallets = [] }: WalletContextProvider) => {
    const onError = useCallback(
      (error: WalletError) => {
        console.error(error);
      },
      [network]
    );

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} onError={onError} autoConnect>
          <ReactUIWalletModalProviderDynamic>{children}</ReactUIWalletModalProviderDynamic>
        </WalletProvider>
      </ConnectionProvider>
    );
  }
);
