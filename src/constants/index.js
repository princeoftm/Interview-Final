//====================== test net ========================================/
const tokenContractAddr = '0x75A5A25a48F456d8C7dBA95559bF12E4A05AE6Ae'
const marketplaceContractAddr = '0xF039022241A1Bbd7cfe880F20DFc99162DB3c973'
const CHAINID = 4
const RPC_URL = 'https://rinkeby.infura.io/v3/33f72aa1b4f441bc8f3a244da53533b4'
const NAME = 'Rinkeby_Testnet'
const SYMBOL = 'ETH'

const ETHEREUM_SETTING = {
  tokenContractAddr: '0xB4b99F35657Ec6EbCa58BB5854c7c34b7FA64258',
  marketplaceContractAddr: '0xEBc57E40163eceD9A2D5E5B67c876335eF108a65',
  CHAINID: 137,
  RPC_URL: 'https://polygon-rpc.com',
  NAME: 'Polygon Mainnet',
  SYMBOL: 'MATIC'
}

// const ETHEREUM_SETTING = {
//   tokenContractAddr: '0x75A5A25a48F456d8C7dBA95559bF12E4A05AE6Ae',
//   marketplaceContractAddr: '0xF039022241A1Bbd7cfe880F20DFc99162DB3c973',
//   CHAINID: 4,
//   RPC_URL: 'https://rinkeby.infura.io/v3/33f72aa1b4f441bc8f3a244da53533b4',
//   NAME: 'Rinkeby_Testnet',
//   SYMBOL: 'ETH'
// }

const BINANCE_SETTING = {
  tokenContractAddr: '0x324a5693448b421ab6e70F24A2C93AC453924403',
  marketplaceContractAddr: '0x0912422b35dC57a50fd8f58d3B4104Bad5176fb4',
  CHAINID: 97,
  RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  NAME: 'BSC_Testnet',
  SYMBOL: 'BNB'
}

export {
  tokenContractAddr,
  marketplaceContractAddr,
  CHAINID,
  RPC_URL,
  NAME,
  SYMBOL,
  ETHEREUM_SETTING,
  BINANCE_SETTING
}
