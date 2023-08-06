import { PublicKey } from '@solana/web3.js';
import { SessionWalletInterface, useGumContext, useUploaderContext } from '@gumhq/react-sdk';
import { ShadowFile } from '@shadow-drive/sdk';
import { Buffer } from 'buffer';

export const useProfileCreate = () => {
  const { sdk } = useGumContext();
  // const { createProfileWithDomain } = useCreateProfile(sdk);
  const { handleUpload } = useUploaderContext();

  const createProfile = async (
    domainName: string,
    profileName: string,
    publicKey: string,
    wallet: SessionWalletInterface
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

      const rawData = {
        domainName,
        profileName,
        publicKey,
      };

      const rawDataJSON = JSON.stringify(rawData);
      const metadataBuffer = Buffer.from(rawDataJSON);

      const profileMetadata: ShadowFile = {
        name: 'TestProfileMetadata',
        file: metadataBuffer,
      };

      const bufferData = profileMetadata.file.toString();
      const parsedFile = JSON.parse(bufferData);

      console.log('parsed file data:', parsedFile);
      console.log('wallet: ', wallet);
      const uploadResponse = await handleUpload(profileMetadata, wallet);
      console.log('Upload response', uploadResponse);
      // if (!uploadResponse) {
      //   console.error('Error uploading profile metadata');
      //   return;
      // }

      const profileResponse = await sdk.profile.create(
        uploadResponse!.url,
        wallet.ownerPublicKey!,
        new PublicKey(publicKey),
        new PublicKey(publicKey)
      );
      console.log('profileResponse: ', profileResponse.profilePDA.toString());
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
