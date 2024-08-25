const axios = require('axios');
require("dotenv").config();

const tokenIdsToCheck = [111,222,333];

const contractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';

async function getLastSalePrice(tokenId) {
  const baseUrl = 'https://api.opensea.io/api/v2';
  const endpoint = `/events/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`;
  const url = baseUrl + endpoint;
  const headers = {
    'Accept': 'application/json',
    'X-API-KEY': process.env.OPENSEA_API_KEY
  };
  const response = await axios.get(url, { headers });
  if (response.data.asset_events.length > 0) {
    let highestPrice = 0;
    let highestSymbol;
    let lastPrice;
    let lastSymbol;
    for (let i = 0; i < response.data.asset_events.length; i++) {
      const event = response.data.asset_events[i];
      if (event.event_type == 'sale') {
        if (event.payment.quantity > highestPrice) {
          highestPrice = event.payment.quantity;
          highestSymbol = event.payment.symbol;
        }
        lastPrice = event.payment.quantity;
        lastSymbol = event.payment.symbol;
      }
    }
    console.log(`${tokenId}: Highest Price: ${(highestPrice / 10e18).toFixed(6)} ${highestSymbol} Last Price: ${(lastPrice / 10e18).toFixed(6)} ${lastSymbol}`);
  } else {
    console.log(`${tokenId}: No Sales :(`);
  }
}

async function checkMultipleNFTs(tokenIds) {
  for (const tokenId of tokenIds) {
    try {
      await getLastSalePrice(tokenId);
    } catch (error) {
      console.error(`Error processing ID ${tokenId}: ${error.message}`);
    }
  }
}

checkMultipleNFTs(tokenIdsToCheck);