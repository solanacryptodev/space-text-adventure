import React, { JSX } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { GameView } from '~/views/Game/GameView';

function Game(): JSX.Element {
  return (
    <>
      <Head>
        <title>Genesys Realms - OPOS: The Legend of the Builders</title>
        <meta name="description" content="A text-based game powered by the Solana blockchain" />
        <link rel="icon" href="/genesys_realms_icon.jpeg" />
      </Head>

      <GameView />
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: any }> {
  return {
    props: {},
  };
}

export default observer(Game);
