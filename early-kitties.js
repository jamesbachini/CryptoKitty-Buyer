const { Alchemy, Network } = require("alchemy-sdk");
require("dotenv").config();

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const wckAddress = '0x09fE5f0236F0Ea5D930197DCE254d77B04128075';
const wg0Address = '0xa10740ff9FF6852eac84cdcfF9184e1D6d27C057';
const wvg0Address = '0x25C7b64A93Eb1261E130eC21a3e9918CaA38b611';
const ownerAddress = wckAddress;

const contractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';

async function getNftsForOwner() {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress, {
      contractAddresses: [contractAddress],
      //pageKey: `MHgwNjAxMmM4Y2Y5N2JlYWQ1ZGVhZTIzNzA3MGY5NTg3ZjhlN2EyNjZkOjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA1N2E5ODpmYWxzZQ==`,
    });
    console.log(`Found ${nfts.totalCount} NFTs owned by ${ownerAddress}:`);
    console.log(`PageKey: ${nfts.pageKey}`); // copy and paste this above to get the next page of results
    nfts.ownedNfts.forEach((nft, index) => {
      console.log(nft.tokenId);
    });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  }
}

getNftsForOwner();
