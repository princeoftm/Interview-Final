import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js';
import Icon from "../components/Icon/Icon";
import NftCard1 from "../components/NftCard/NftCard1";

import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";
import tokenABI from "../constants/abi/token";
import marketplaceABI from '../constants/abi/marketplace';
import { ethers } from "ethers";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { errorAlert } from "../components/toastGroup";

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const dummyNFT = {
  title: "The planted eyes",
  nftUrl: "sport1.png",
  userName: "Amanda Ebubechukwu",
  avatarUrl: "avatar1.png",
  like: 2517,
};

let tokenContractAddr, marketplaceContractAddr
let tokenContract, marketContract

export default function ListItem({ action = '/listing-payment' }) {

  const router = useRouter()
  const [saleFrcPrice, setSaleFrcPrice] = useState('0')
  const [saleFrcAmount, setSaleFrcAmount] = useState(1)
  const [metadata, setMetadata] = useState({})
  const [totalFraction, setTotalFraction] = useState(0)

  const handleParam = setValue => e => setValue(e.target.value)
  const walletAddress = useSelector(state => state.user.address)
  const provider = useSelector(state => state.user.provider)
  const blockchain = useSelector(state => state.user.blockchain)


  const { query } = useRouter()
  const { tokenId } = query

  useEffect(() => {
    const init = async () => {
      if (provider !== null) {
        let signer = provider.getSigner()

        if (blockchain === 'Ethereum') {
          tokenContractAddr = ETHEREUM_SETTING.tokenContractAddr
          marketplaceContractAddr = ETHEREUM_SETTING.marketplaceContractAddr
        }
        else if (blockchain === 'Binance') {
          tokenContractAddr = BINANCE_SETTING.tokenContractAddr
          marketplaceContractAddr = BINANCE_SETTING.marketplaceContractAddr
        }

        tokenContract = new ethers.Contract(tokenContractAddr, tokenABI, signer)

        marketContract = new ethers.Contract(marketplaceContractAddr, marketplaceABI, signer)

        try {
          const tknUrl = await tokenContract.uri(tokenId)
          const frcPrice = await tokenContract.fractionPrice(tokenId)
          console.log('fration price:', frcPrice.toString())
          console.log('------------frcPrice', ethers.utils.formatEther(frcPrice))
          setSaleFrcPrice(frcPrice.toString())

          const fractionCount = await tokenContract.balanceOf(walletAddress, tokenId)
          setTotalFraction(fractionCount.toNumber())
          setSaleFrcAmount(fractionCount.toNumber())

          const metadt = (await axios.get(tknUrl)).data
          console.log('metadt--------', metadt)
          setMetadata({ ...metadt })
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    init()
  }, [tokenId, provider, walletAddress])

  const handleSubmit = preventDefault(async () => {
    if (saleFrcPrice <= 0) {
      errorAlert('Listing price must be bigger than 0')
      return
    }

    if (saleFrcAmount > totalFraction) {
      errorAlert('Fraction count exceeed!')
      return
    }

    console.log('Creating sale:', tokenId, saleFrcPrice, saleFrcAmount, walletAddress)
    try {
      const tx = await marketContract.createSale(tokenId, saleFrcPrice, saleFrcAmount)
      const res = await tx.wait()
      console.log('result:', res)
    } catch (err) {
      console.log('error:', err)
    }

    router.push({
      pathname: action,
      query: { tokenId: tokenId, p: saleFrcPrice, q: saleFrcAmount },
    })
  })

  return (
    <section className="container mx-auto my-10 justify-center flex gap-4 flex-wrap">
      <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />
      <ListForm
        saleFrcPrice={saleFrcPrice}
        setSaleFrcPrice={setSaleFrcPrice}
        saleFrcAmount={saleFrcAmount}
        setSaleFrcAmount={setSaleFrcAmount}
        handleSubmit={handleSubmit}
        totalFraction={totalFraction}
      />

      <div className="w-96 border border-orange rounded-xl h-fit">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <Icon type="play" />
            <span className="text-cape-cod font-bold text-lg">Preview</span>
          </div>
          <button className="border rounded-full py-1 px-4 text-orange border-orange">
            View Full Screen
          </button>
        </div>
        <div className="bg-[#f6f6f6] p-4">
          <NftCard1
            item={metadata}
            id={8}
            className="w-[95%] mx-auto h-full rounded-[10px] relative drop-shadow-[0_4px_48px_rgba(183,194,207,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}

const ListForm = ({ saleFrcPrice, setSaleFrcPrice, saleFrcAmount, setSaleFrcAmount, handleSubmit, totalFraction }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f6f6f6] rounded-md p-4 flex-1"
    >
      <h1 className="text-2xl font-bold my-3 mb-11 text-[#3a3a3a]">
        List NFT for sale
      </h1>
      <div className="flex flex-col mb-8">
        <div className="block text-rolling-stone font-bold mb-2">
          NFT Available for
          <span className="block opacity-70 font-normal mt-1 text-sm">
            Current NFT price is determined by PayByMint Smart Contract
          </span>
        </div>
        <button
          type="button"
          className="bg-white rounded-md flex items-center gap-2 text-sm p-2 w-fit text-[#9e9e9e]"
        >
          <Icon type={"ticket"} />
          <span>Fixed Price</span>
        </button>
      </div>
      <div className="flex flex-col mb-8">
        <label className="block text-rolling-stone font-bold mb-2">
          Listing Price
          <span className="block opacity-70 font-normal mt-1 text-sm">
            Current NFT Value
          </span>
        </label>
        <div className="flex gap-1 ">
          <select className="px-2 border border-orange rounded">
            <option>ETH</option>
          </select>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="string"
            disabled
            // onChange={(e) => setSaleFrcPrice(e.target.value)}
            value={BigNumber(saleFrcPrice).dividedBy(BigNumber('1000000000000000000')).toString()}
          />
        </div>
        {/* <p className="text-sm mt-2 flex items-center">
          <span className="opacity-70 mr-3">You will receive : </span>
          <Icon type={"ether"} height="16" fill="#3a3a3a" />
          <span className="text-[#3a3a3a] font-bold">{saleFrcPrice} ETH</span>
        </p> */}
      </div>
      <div className="flex flex-col mb-8">
        <label className="block text-rolling-stone font-bold mb-2">
          No of fractions ( Total : {totalFraction} )
          <span className="block opacity-70 font-normal mt-1 text-sm">
            Select no of fractions to be listed
          </span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          onChange={(e) => setSaleFrcAmount(e.target.value)}
          value={saleFrcAmount}
          max={totalFraction}
          min={0}
        />
      </div>
      <div className="border-t border-t-[#e6e6e9] pt-8 pb-8 flex">
        <button className="rounded-md py-2 px-4 bg-orange text-white mr-4 w-44" disabled={saleFrcAmount === 0}>
          Complete Listing
        </button>
        <button
          type="button"
          className="rounded-md py-2 px-4 bg-white border border-[#e7e7f0] text-[#9e9e9e] w-44"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
