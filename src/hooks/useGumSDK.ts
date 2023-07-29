import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { GRAPHQL_ENDPOINTS, useGum } from '@gumhq/react-sdk';
import { useMemo } from 'react';
import { GraphQLClient } from 'graphql-request';

export const useGumSDK = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet()!;

  // GraphQL endpoint is chosen based on the network
  const graphqlEndpoint = GRAPHQL_ENDPOINTS.devnet;

  const gqlClient = useMemo(() => new GraphQLClient(graphqlEndpoint), [graphqlEndpoint]);

  return useGum(
    anchorWallet,
    connection,
    { preflightCommitment: 'confirmed' },
    'devnet',
    gqlClient
  );
};
