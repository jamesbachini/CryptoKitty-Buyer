const { ethers } = require("ethers");
require("dotenv").config();

const toBuy = [111,222,333];
const destinationAddresses = ['0xYourDestinationAddress'];

const contractABI = [ { inputs: [ { internalType: "uint256[]", name: "kittyIds", type: "uint256[]" }, { internalType: "address[]", name: "destinationAddresses", type: "address[]" } ], name: "burnTokensAndWithdrawKitties", outputs: [], stateMutability: "nonpayable", type: "function" } ];
const wckAddress = '0x09fE5f0236F0Ea5D930197DCE254d77B04128075'; // wrapped cryptokitties
const wg0Address = '0xa10740ff9FF6852eac84cdcfF9184e1D6d27C057'; // wrapped gen0 cryptokitties
const wvg0Address = '0x25C7b64A93Eb1261E130eC21a3e9918CaA38b611'; // wrapped virgin gen0 cryptokitties
const contractAddress = wckAddress;

async function main() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mevblocker.io/fast');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log(`Wallet connected: ${wallet.address}`)
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  for (const id of toBuy) {
    try {
      console.log(`Buying Kitty: https://www.cryptokitties.co/kitty/${id}`);
      //await new Promise(r => setTimeout(r, 13000)); // slow it down 13 seconds
      const kittyIds = [id];
      const tx = await contract.burnTokensAndWithdrawKitties(kittyIds, destinationAddresses);
      const receipt = await tx.wait();
      console.log(`Kitty Purchased: https://www.cryptokitties.co/kitty/${id}`);
      console.log(`Transaction hash: ${receipt.hash}`);
    } catch (error) {
      console.error(`Error processing ID ${id}:`, error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });