import 'reflect-metadata';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppType } from 'next/app';
import { UseWalletContextProvider } from '~/hooks/useWalletContextProvider';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';
import UseGumSDKProvider from '~/hooks/useGumSDKProvider';
import GumSessionProvider from '~/components/SessionProvider/GumSessionProvider';

import { mercuryApi } from '~/utils/api';
import '~/styles/globals.css';
import ProfileDataProvider from '~/hooks/profileDataProvider';

require('@solana/wallet-adapter-react-ui/styles.css');

const TextGameApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_MAINNET_ENDPOINT ?? clusterApiUrl(network);
  const wallets = useMemo(() => [new SolflareWalletAdapter()], [network]);
  return (
    <UseWalletContextProvider wallets={wallets} network={network} endpoint={endpoint}>
      <UseGumSDKProvider>
        <SessionProvider session={session}>
          <GumSessionProvider>
            <ProfileDataProvider>
              <Component {...pageProps} />
            </ProfileDataProvider>
          </GumSessionProvider>
        </SessionProvider>
      </UseGumSDKProvider>
    </UseWalletContextProvider>
  );
};

export default mercuryApi.withTRPC(TextGameApp);
