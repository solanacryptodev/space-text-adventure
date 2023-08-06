import React, { useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { GUM_TLD_ACCOUNT, GumNameService, useGumContext } from '@gumhq/react-sdk';
import { PublicKey } from '@solana/web3.js';

export const ProfileView = () => {
  const wallet = useAnchorWallet();
  const { sdk } = useGumContext();

  // Create state for domain
  const [domain, setDomain] = useState('');

  return (
    <div>
      <h1 className="bg-black">Create new .gum domain</h1>

      <input
        type="text"
        value={domain}
        onChange={(event) => setDomain(event.target.value)}
        placeholder="Enter domain name"
        className="bg-white"
      />

      {wallet?.publicKey && (
        <button
          className="bg-white"
          onClick={async (event) => {
            event.preventDefault();
            const nameService = new GumNameService(sdk);

            const screenName = await nameService.getOrCreateDomain(
              GUM_TLD_ACCOUNT,
              domain,
              wallet?.publicKey as PublicKey
            );
            console.log(`screenName: ${screenName}`);
          }}
        >
          Create Domain
        </button>
      )}
    </div>
  );
};
