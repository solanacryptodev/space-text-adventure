import { type JSX } from 'react';
import Head from 'next/head';
import React from 'react';
import { LandingView } from '~/views/Landing/LandingView';
import { observer } from 'mobx-react-lite';

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Genesys Realms</title>
        <meta name="description" content="A text-based game powered by the Solana blockchain" />
        <link rel="icon" href="/genesys_realms_icon.jpeg" />
      </Head>

      <LandingView />
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: any }> {
  return {
    props: {},
  };
}

export default observer(Home);
