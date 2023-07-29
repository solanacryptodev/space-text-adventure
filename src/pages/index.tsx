import { type JSX } from 'react';
import Head from 'next/head';
import React from 'react';
import { LandingView } from '~/views/Landing/LandingView';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Text Game</title>
        <meta name="description" content="A text-based game powered by the Solana blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingView />
    </>
  );
}
