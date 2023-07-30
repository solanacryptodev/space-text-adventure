import { TRPCError } from '@trpc/server';
import { profileSchema } from '~/lib/schemas/schema';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
  useCreateProfile,
  useGumContext,
  useUploaderContext,
  useShadowStorage,
} from '@gumhq/react-sdk';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export const profileRouter = createTRPCRouter({
  createProfile: publicProcedure.input(profileSchema).mutation(async ({ input }) => {
    const wallet = useWallet();
    const { sdk } = useGumContext();
    const { createProfileWithDomain } = useCreateProfile(sdk);
    const { handleUpload } = useUploaderContext();
    const { domainName, screenName, publicKey, profilePicture, characters } = input;

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
        screenName,
        profilePicture,
        characters,
      };
      const uploadResponse = await handleUpload(profileMetadata, wallet);
      console.log('Upload response', uploadResponse);
      if (!uploadResponse) {
        console.error('Error uploading profile metadata');
        return;
      }

      const profileResponse = await createProfileWithDomain(
        uploadResponse.url,
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

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong while retrieving your profile.',
      });
    }
  }),
});
