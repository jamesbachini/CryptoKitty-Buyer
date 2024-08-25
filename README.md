# CryptoKitty Buyer Tools

These tools are for automating the process buying up cryptokitties NFT's.

### early-kitties.js 
This will list the first id's an address holds. Used with the following token vaults you can get a list of the earliest tokens in the vaults. Requires an Alchemy API key.

```
const wckAddress = '0x09fE5f0236F0Ea5D930197DCE254d77B04128075';
const wg0Address = '0xa10740ff9FF6852eac84cdcfF9184e1D6d27C057';
const wvg0Address = '0x25C7b64A93Eb1261E130eC21a3e9918CaA38b611';
```

### expensive-kitties.js

Used to find the highest sales price and last sales price for an array of token ID's. Uses the Opensea API and you'll need a API key in the .env file

### buy-kitties.js

The token vaults above have a function called burnTokensAndWithdrawKitties which takes an array of tokenId's but because of the reentrancy guard you have to call it individually for each token. This automates that process, you'll need some of the tokens which you can get from Uniswap and some eth for gas fees.