import { PublicKey } from '@solana/web3.js';
import { useGumContext, useUploaderContext, useCreateProfile } from '@gumhq/react-sdk';

export const useProfileCreate = () => {
  const { sdk } = useGumContext();
  const { createProfileWithDomain } = useCreateProfile(sdk);
  const { handleUpload } = useUploaderContext();

  const createProfile = async (
    domainName: string,
    profileName: string,
    publicKey: string,
    wallet: any
  ) => {
    try {
      if (!publicKey) {
        console.log('No public key found');
        return;
      }

      const profilePDA = await sdk.profile.getProfileByDomainName(domainName);
      console.log('Profile PDA', profilePDA);
      if (profilePDA) {
        console.log('Profile account found with username', domainName);
        return;
      }

      const profileMetadata = {
        publicKey,
        domainName,
        profileName,
      };
      console.log('profileMetadata:', profileMetadata);
      const uploadResponse = await handleUpload(profileMetadata!, wallet).catch((error) =>
        console.log('err: ', error)
      );
      console.log('Upload response', uploadResponse);
      if (!uploadResponse) {
        console.error('Error uploading profile metadata');
        return;
      }

      const profileResponse = await createProfileWithDomain(
        '8ew8wec8e8e8238cw',
        domainName,
        new PublicKey(publicKey),
        new PublicKey(publicKey)
      );
      if (!profileResponse) {
        console.error('Error creating profile');
        return;
      }
    } catch (error) {
      console.error('Error creating profile', error);
      // if (e instanceof PrismaClientKnownRequestError) {
      //     if (e.code === 'P2002') {
      //         throw new trpc.TRPCError({
      //             code: 'CONFLICT',
      //             message: 'User already exists',
      //         })
      //     }
      // }
    }
  };

  return { createProfile };
};
