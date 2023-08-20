# OPOS Hackathon Project

This is a Proof of Concept demo that was created for the OPOS Hackathon. It is a simple web app that allows users to create a profile through the Gum program and then create a character which is stored on Shadow Drive. 

Once a character is created, you can click the 'Play Game' button on the 
home page to play a simple text-based module.

## Gum Domain

This POC is meant to show that a profile system can be built using a Solana program like Gum.
Gum is a program that allows for a lot of interesting functionalities that
will be useful in a production-ready game.

## Shadow Drive

I chose shadow drive as the storage layer for this POC because I wanted
to remain Solana-native. SHDW can be leveraged to build web3 games
such as this by simply uploading and editing JSON metadata.

All the text-based dialogue data is stored on-chain and due to
the current low cost of shdw tokens and the low cost of storage,
it's easy to imagine a future where entire text-based games are
stored on-chain at very low costs.

## Compressed NFTs (cNFTs)

State compression is a very important topic in the Solana ecosystem. This demo
is mostly meant to show how useful cNFTs can be in a game due to
decreases in cost of production for the builder and minting for the
user/player.