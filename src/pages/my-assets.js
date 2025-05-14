import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { marketplaceContractAddr, tokenContractAddr } from '../constants'

import Market from '../../artifacts/contracts/PoulinaMarketplace.sol/PoulinaMarketplace.json'
import NFT from '../../artifacts/contracts/PoulinaToken.sol/PoulinaToken.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })

    console.log('web3modal', web3Modal)
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(marketplaceContractAddr, Market, signer)

    const tokenContract = new ethers.Contract(tokenContractAddr, NFT, provider)
    const data = await marketContract.getSales()
    console.log('data', data)

    let items = []
    if (data[0].length > 0)
      items = await Promise.all(
        new Array(4).map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(data[1][i])
          const meta = await axios.get(tokenUri)
          let price = ethers.utils.formatUnits(data[2][i].toString(), 'ether')
          let item = {
            price,
            tokenId: data[1][i].toNumber(),
            seller: data[0][i],
            owner: 'owner',
            image: meta.data.image,
          }
          return item
        })
      )
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.length > 0 &&
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">
                    Price - {nft.price} Eth
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
