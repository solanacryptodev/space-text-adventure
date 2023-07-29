import { signIn, signOut, useSession } from 'next-auth/react';
import { mercuryApi } from '~/utils/api';
import React, { JSX } from 'react';
import { observer } from 'mobx-react-lite';

export const UseAuthExample = observer((): JSX.Element => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = mercuryApi.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
});
