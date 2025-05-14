import { ethers } from "ethers";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import Web3Modal from "web3modal";
import Link from 'next/link'

import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";

import tokenABI from "../constants/abi/token";
import Promise from 'bluebird'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

let tokenContractAddr

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState([])
  const [tokenContract, setTokenContract] = useState({})

  const walletAddress = useSelector((state) => {
    return state.user.address
  })

  const provider = useSelector((state) => {
    return state.user.provider
  })

  const blockchain = useSelector((state) => {
    return state.user.blockchain
  })


  useEffect(() => {
    const init = async () => {
      setLoading(true)
      if (provider !== null) {
        let signer = provider.getSigner()

        if (blockchain === 'Ethereum')
          tokenContractAddr = ETHEREUM_SETTING.tokenContractAddr
        else if (blockchain === 'Binance')
          tokenContractAddr = BINANCE_SETTING.tokenContractAddr

        console.log('tokenCont', tokenContractAddr)

        const _tokenContract = new ethers.Contract(tokenContractAddr, tokenABI, signer)
        setTokenContract(_tokenContract)

        try {
          console.log('------------', walletAddress)
          let tokenIds = await _tokenContract.getTokenIdByUser(walletAddress)
          console.log('tokenIds', tokenIds)

          let metadt = []
          await Promise.all(tokenIds.map(async tknId => {
            const tknUrl = await _tokenContract.uri(tknId.toNumber())
            console.log('tknUrl----------------', tknUrl)
            try {
              const curMeta = await axios.get(tknUrl)
              console.log('curMeta----------------', curMeta.data)
              metadt.push({ ...curMeta.data, tokenId: tknId.toNumber() })
            } catch (error) {

            }
            // setImage(metadt.data.image)



          }))
          console.log('metadt', metadt)
          setMetadata(metadt)


        } catch (error) {
          console.log('error', error)
        }
      }
      setLoading(false)
    }

    init()

    // loadNFTs();
  }, [walletAddress, provider]);
  async function loadNFTs() {

    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.uri(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        return {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          category: meta.data.category,
        };
      })
    );
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }


  // if (loadingState === "loaded" && !nfts.length)
  //   return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  console.log('metadata============', metadata)
  return (
    <Fragment>
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4" >
            {loading ? <h1 style={{ textAlign: "center" }}>Loading your items...</h1> : metadata.length > 0 ? metadata.map((nft, i) => (
              <Link href={`/fraction?tokenId=${nft.tokenId}`} key={i}>
                <div key={nft.tokenId} className="overflow-hidden border shadow rounded-xl">
                  <img src={nft.image} />
                  <div className="p-4">
                    <p
                      style={{ height: "64px" }}
                      className="text-2xl font-semibold"
                    >
                      {nft.name}
                    </p>
                    <div style={{ height: "70px", overflow: "hidden" }}>
                      <p className="text-gray-400">{nft.description}</p>
                      <p>{nft.category}</p>
                    </div>
                  </div>
                  {/* <div className="p-4 bg-black">
                  <p className="mb-4 text-2xl font-bold text-white">
                    {nft.price} ETH
                  </p>
                  <button
                    className="w-full px-12 py-2 font-bold text-white bg-pink-500 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
                </div> */}
                </div>
              </Link>
            )) : 'You have no your own items'}
          </div>
        </div>
      </div>
      {
        loading && <div style={{ position: 'fixed', top: '0px', left: '0px', zIndex: '10000000000 !important', width: '100%', height: '100%', backgroundColor: '#ffffff', opacity: '0.5', zIndex: '10000' }}>
          <Loader
            type="Puff"
            height={100}
            width={100}
            style={{
              position: 'fixed',
              top: 'calc(50% - 50px)',
              left: 'calc(50% - 50px)'
            }}
          />
        </div>
      }
    </Fragment>
  );
}
