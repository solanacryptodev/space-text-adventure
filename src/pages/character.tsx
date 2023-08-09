import React, { JSX } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { ProfileView } from '~/views/Profile/ProfileView';

function Character(): JSX.Element {
  return (
    <>
      <Head>
        <title>Genesys Realms - Character Creation</title>
        <meta name="description" content="A text-based game powered by the Solana blockchain" />
        <link rel="icon" href="/genesys_realms_icon.jpeg" />
      </Head>

      <ProfileView />
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: any }> {
  return {
    props: {},
  };
}

export default observer(Character);
