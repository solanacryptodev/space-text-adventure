import { TRPCError } from '@trpc/server';
import { profileSchema } from '~/lib/schemas/schema';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
// import {
//   useCreateProfile,
//   useGumContext,
//   useUploaderContext,
//   useShadowStorage,
// } from '@gumhq/react-sdk';
// import { PublicKey } from '@solana/web3.js';
// import { useWallet } from '@solana/wallet-adapter-react';

export const profileRouter = createTRPCRouter({
  createProfile: publicProcedure.input(profileSchema).mutation(async ({ input }) => {
    console.log(input);
    // const wallet = useWallet();
    // const { sdk } = useGumContext();
    // const { createProfileWithDomain } = useCreateProfile(sdk);
    // const { handleUpload } = useUploaderContext();
    // const { domainName, publicKey, characters, profileName, dateCreated } = input;

    try {
      // enter
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
