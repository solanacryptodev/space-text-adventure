import { mercuryApi } from '~/utils/api';

export const testEndpoint = (): string | undefined => {
  const query = mercuryApi.example.hello?.useQuery({ text: 'from tRPC' });
  const queryData = query?.data;
  return queryData?.greeting;
};

export const createProfile = (
  domainName: string,
  screenName: string,
  publicKey: string,
  profilePicture: string
): void => {
  const dateCreated = new Date();
  const characters: [] = [];

  return mercuryApi.profile.createProfile
    ?.useMutation()
    .mutate({ domainName, screenName, publicKey, profilePicture, characters, dateCreated });
};
