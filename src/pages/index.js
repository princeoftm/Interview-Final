import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { ethers, providers } from "ethers"
import Promise from 'bluebird'
import axios from 'axios'
import Link from 'next/link'

import Button from "../components/Button/Button";
import EffectCardSwiper from "../components/EffectCardSwiper/EffectCardSwiper";
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
import NftCard from '../components/NftCard/NftCard';
import Image from 'next/image';
import NavigationSwiper from '../components/NavigationSwiper/NavigationSwiper';
import { ArrowNarrowRightIcon, ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/solid";

import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";
import tokenABI from "../constants/abi/token";
import marketplaceABI from '../constants/abi/marketplace';
import HowItWorksTab from '../components/HowItWorksTabs/HowItWorksTabs'
import Icon from '../components/Icon/Icon'

let tokenContractAddr, marketplaceContractAddr
let tokenContract, marketContract

const currentProvider = ethers.providers.getDefaultProvider(ETHEREUM_SETTING.RPC_URL, {
  etherscan: 'B3HD76NSM9XGM1MKAWFQCWMU8GPRAUD1I1',
  infura: '33f72aa1b4f441bc8f3a244da53533b4',
})

const Home = () => {
  const [saleData, setSaleData] = useState([])
  const [whatIs, showWhatIs] = useState(false);
  const [howItWorksTab, setHowItWorksTab] = useState('Merchants');
  const walletAddress = useSelector(state => state.user.address)
  const provider = useSelector(state => state.user.provider)
  const blockchain = useSelector(state => state.user.blockchain)

  useEffect(() => {
    const init = async () => {
      console.log('provider:', provider);
      if (blockchain === 'Ethereum') {
        tokenContractAddr = ETHEREUM_SETTING.tokenContractAddr
        marketplaceContractAddr = ETHEREUM_SETTING.marketplaceContractAddr
      }
      else if (blockchain === 'Binance') {
        tokenContractAddr = BINANCE_SETTING.tokenContractAddr
        marketplaceContractAddr = BINANCE_SETTING.marketplaceContractAddr
      }
      let signer
      if (!!provider) {
        signer = provider.getSigner()
      } else {
        signer = new providers.JsonRpcProvider(ETHEREUM_SETTING.RPC_URL)
      }


      tokenContract = new ethers.Contract(tokenContractAddr, tokenABI, currentProvider)

      marketContract = new ethers.Contract(marketplaceContractAddr, marketplaceABI, currentProvider)

      try {
        console.log('getting sales')
        const sales = await marketContract.getSales()
        console.log('got sales:', sales)
        const sellers = sales[0]
        const tokenIds = sales[1]
        const prices = sales[2]
        const amounts = sales[3]
        let saleDt = []
        await Promise.all(tokenIds.map(async (tokenId, index) => {
          try {
            const tokenURI = (await tokenContract.uri(tokenId)).replace('ipfs://', 'https://ipfs.io/ipfs/')
            const metadata = (await axios.get(tokenURI)).data
            console.log("metadat:", metadata)
            saleDt.push({ ...metadata, price: prices[index], seller: sellers[index], amount: amounts[index], tokenId })
          } catch (err) {
            console.log('error getting metadata:', err)
          }
        }))
        console.log('saledata:', saleDt)
        setSaleData([...saleDt])
        console.log('current sales:', saleDt)
      } catch (error) {
        console.log('error', error)
      }
    }
    init()
  }, [provider, walletAddress])

  const trendingNfts = [
    { title: 'The planted eyes', image: '/assets/nfts/trending1.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/trending2.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/trending3.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/trending4.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
  ];

  const likeNfts = [
    { title: 'The planted eyes', image: '/assets/nfts/like1.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/like2.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/like3.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
    { title: 'The planted eyes', image: '/assets/nfts/like4.png', userName: 'Amanda Ebubechukwu', avatarUrl: 'avatar1.png' },
  ];

  const aboutUs = [
    { title: 'Innovative Creators', imgUrl: 'innovative.png', width: 82, height: 82 },
    { title: 'High Profit & Bonuses', imgUrl: 'profit.png', width: 68, height: 82 },
    { title: 'Diverese and Quality Artworks', imgUrl: 'artwork.png', width: 60, height: 82 },
    { title: 'Unique Platform', imgUrl: 'unique.png', width: 82, height: 82 },
  ];

  return (
    <Fragment>
      <section className="flex flex-col px-8 py-14">
        <div className="mb-24 flex flex-col md:flex-row gap-y-9">
          <div className="flex flex-col flex-1 items-start justify-start" >
            <p className="mb-6 font-medium text-trout text-4xl md:text-15xl max-w-[600px]">Transform your Customers into Investors</p>
            <p className="text-lg text-pale-sky mb-14">Internet businesses of all sizes - from startups to large enterprises use paybymint as a payment solution to accept crypto payments, track orders and send payouts on the blockchain.
              Businesses are able to accept crypto payment when customers mint a fraction of their NFT rather than direct payment. </p>
            <div className="flex items-center text-lg">
              <Link href="https://calendly.com/paybymint" passHref><a target="_blank" rel="noopener noreferrer"><Button className="py-4 text-white px-10 md:px-14 rounded-3xl bg-orange">Schedule a Demo</Button></a></Link>
              <Link href="/create-item" passHref><Button className="py-4 ml-6 bg-white border border-solid px-10 md:px-14 rounded-3xl text-orange border-orange">Get Started</Button></Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <EffectCardSwiper items={saleData} />
          </div>
        </div>
        {/* <div className="flex items-center justify-center">
          <Notification avatar="avatar2.png" time="2 mins ago">
            938Yahriz Javeir  purchased <Link href="#" className="font-semibold underline">Maria de bousqet</Link> at $43.3USD
          </Notification>
        </div> */}
      </section>
      <section id="feed" className="flex flex-col md:flex-row gap-y-5 px-8 py-10 bg-athens-gray">
        <CategoryMenu />
        <div className='pl-0 md:pl-8'>
          <div className='flex flex-wrap gap-4 mb-8 items-center justify-center'>
            {saleData.map((sale) => (
              <NftCard item={sale} key={sale.tokenId} className="w-[360px] h-[450px] rounded-[10px] relative drop-shadow-[0_4px_48px_rgba(183,194,207,0.7)]" />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col px-8 pt-16 mb-24">
        <button onClick={() => showWhatIs(!whatIs)} className="mb-8 text-3xl font-bold text-rolling-stone flex justify-between px-6 hover:text-orange">
          <span>What is PayByMint?</span>
          {!whatIs ?
            <ArrowRightIcon
              className="w-7 h-7 font-extrabold"
              aria-hidden="true"
            /> :
            <ArrowDownIcon
              className="w-7 h-7 font-extrabold"
              aria-hidden="true"
            />
          }
        </button>

        {whatIs && <div className="flex flex-col md:grid md:grid-cols-2 gap-10">
          <p>
            Paybymint is a Blockchain payment and investment solution in the NFT
            space. An NFT platform that enables customers to pay for
            goods/services by purchasing a fraction of the merchant’s NFT rather
            than direct payment.
          </p>
          <p>
            Businesses are being able to accept payment from customers by
            letting customers purchase their NFTs as the money realized from the
            NFT sale covers expenses for the goods/services rendered. This can
            be achieved through Fractionalized NFTs also known as FNFT.
          </p>{' '}
          <p>
            This will create a viable economy for the merchant on the blockchain
            and also be a form of investment and passive income to the customer.
            Simply put;{' '}
            <span className="font-bold">
              “Paying for a merchant’s goods or services by purchasing the
              merchant’s own token(currency) either to retain as an asset or
              resell to future customers. Whenever a resale is made, 70% of
              revenue from the sale goes back to the merchant to cover expenses
              for the goods or services to be rendered”.
            </span>{' '}
            This means that the customer is paying for goods/ services rendered
            and in the same process acquiring a digital asset.
          </p>
          <p>
            Ownership is through a smart contract that transfers a piece or
            fraction of the merchant’s NFT, equivalent to the invoice issued for
            the goods or services received. Subsequently, the purchased NFT
            fraction may then be listed on the platform by the customer so
            future customers can iterate the process. For example, the merchant
            launches an NFT that contain 1 million fractions. After the initial
            1million has been purchased by numerous customers through payment
            for one type of goods or another, future customers paying for
            goods/service through this method will still have a chance but this
            time will be purchasing in the secondary market from initial
            customers who are current NFT fraction holders who have listed their
            fractions for sale as secondary sellers, and the cycle continues.
          </p>{' '}
          <p>
            The NFT Value growth rate is determined by the standard rate defined
            and regulated by the Paybymint Smart contract. (0.5% per 100,000
            fractions sold)
          </p>{' '}
          <p>
            Paybymint smart contract states that 75% of revenue generated from
            every secondary sale goes back to the merchant to cover for the cost
            of goods or services rendered while 25% remains with the nft holder
            as dividend.
          </p>{' '}
          <p>
            The customer who is a fraction owner may list their fraction for
            sale as a secondary seller. When new customers make payment, the
            algorithm picks up fractions according to who listed first. In cases
            where a fraction listed to be sold is less than the intended
            fraction to be purchased, the algorithm picks little pieces of
            fractions from other sellers to make up the fraction. Customers will
            be able to list any number of fractions they wish from their NFT
            fraction. The algorithm will select and sell only the listed
            fraction from each owner.
          </p>
        </div>}
      </section>
      <section className='flex flex-col px-8 pt-16 mb-24'>
        <span className='mb-8 text-3xl text-center font-bold text-rolling-stone'>How It Works</span>
        <HowItWorksTab activeTab={howItWorksTab} setActiveTab={setHowItWorksTab} />
        {/* <ul>
          {
            (howItWorksTab == "Customers" ? howItWorksCustomers : howItWorksMerchants).map((item, idx) => (
              <li key={item.title} className='text-xl leading-7 text-black/[0.8] mt-2 list-disc list-inside'>{item.title}</li>
            ))
          }
        </ul> */}
        {
          howItWorksTab === "Merchants" ?

            <div className='flex gap-y-8 flex-col md:flex-row text-center mt-24'>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"wallet"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Set up your Business Digital wallet</h4>
                <p>Once you’ve set up your wallet of choice, connect it to Paybymint by clicking the wallet icon in the top right corner. We currently support MetaMask and Binance. </p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"nft"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Create NFT to represent your brand or product</h4>
                <p>Upload your brand NFT(image, video, audio, or 3D art), and determine NFT total value in ETH, add a title and description. NFT can be brand logo, product image etc </p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"list"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>List Your NFT</h4>
                <p>When you list your NFT, a link to your NFT is automatically generated for you. Use link to redirect your customers at point of check out from your website to continue payment on Paybymint. </p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"deposit"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Eth is Deposited instantly to your Digital wallet</h4>
                <p>When Customers pay for your product on Paybymint. Eth is deposit directly to your Business Digital wallet address
                  Transaction email is automatically sent to business email address on file to identify and
                  Fulfill order </p>
              </div>
            </div>
            :
            <div className='flex flex-col gap-y-8 md:flex-row text-center mt-24'>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"users"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Get Started as a Customer </h4>
                <p>You will be redirected at checkout from merchant’s website to Merchant’s NFT page on Paybymint. </p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"wallet"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Set up your wallet of choice</h4>
                <p>Connect it to Paybymint by clicking the wallet icon in the top right corner. We currently support MetaMask and Binance. </p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"deposit"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>Pay By Minting</h4>
                <p>Pay for product or service rendered by merchant by minting a fraction of merchant’s NFT equivalence of your total bill. After payment, NFT is automatically transferred into your Account.</p>
              </div>
              <div className='flex flex-1 flex-col items-center p-2'>
                <Icon type={"list"} />
                <h4 className='text-[#333] font-bold text-lg m-2'>List your NFT </h4>
                <p>You have the option of listing your as a secondary seller for other paying customers to buy at new rate thereby generating revenue for you.</p>
              </div>
            </div>
        }
      </section>

      <section className='flex flex-col px-8 pt-24'>
        <div className='flex items-center mb-4'>
          <Image src={'/assets/hot-collection.png'} alt="hot" width={53} height={53} />
          <span className='ml-3 text-3xl font-bold text-rolling-stone'>Hot Deals</span>
        </div>
        {/* <NavigationSwiper type="creator" titleImg={"/assets/recomend.png"} title="Recomended Creators" moreBtn="Discover More Creators" items={creatorItems} swiperClassName='w-full h-[320px]' /> */}
        <NavigationSwiper type="nft" titleImg={"/assets/trending.png"} title="Trending NFTs" moreBtn="Discover More Trending NFTs" items={trendingNfts} swiperClassName='w-full h-[435px]' />
        <NavigationSwiper type="nft" titleImg={"/assets/like.png"} title="Mostly liked NFTs" moreBtn="Discover Mostly Liked NFTs" items={likeNfts} swiperClassName='w-full h-[435px]' />
      </section>

      <section className='flex flex-col px-8 pt-24'>
        <div className='flex items-center justify-between mb-8'>
          <span className='text-3xl font-bold text-rolling-stone'>User Guide</span>
          <div className='flex items-center'>
            <span className='text-lg text-orange'>Full User Guidance</span>
            <Button type="button" className="ml-6 text-lg text-orange rounded-full border border-orange w-[52px] h-[52px] flex justify-center items-center">
              <ArrowNarrowRightIcon
                className="w-5 h-5 text-orange"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='flex flex-col items-center mr-12 -rotate-90 md:rotate-0'>
            <Button type="button" icon="bold-arrow-top" className='flex items-center justify-center w-8 h-8 mb-7 bg-gallery'></Button>
            <Button type="button" icon="bold-arrow-down" className='flex items-center justify-center w-8 h-8 bg-gallery'></Button>
          </div>
          <div className='bg-athens-gray rounded-[10px] flex-1 p-8'>
            <div className='flex mb-8 guide-question'>
              <Image src={'/assets/question-mark.png'} alt="guide-question" width={32} height={32} />
              <span className='flex-1 text-black/[0.8] font-semibold text-2xl leading-7 ml-6'>How do I create a NFT?</span>
            </div>
            <div className='flex items-start guide-answer'>
              <Image src={'/assets/robot.png'} alt="guide-answer" width={32} height={32} />
              <span className='flex-1 text-black/[0.8] text-lg leading-7 ml-6'>Click [Create] and choose your file to upload. We currently support JPG, PNG, GIF, PDF, MP4, MP3, MPEG, AVI, WAV, and SVG. Please note that your NFT cannot be changed or revised once created. To create a revised/new NFT, you will have to start the process again.</span>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-col px-8 pt-16 mb-24'>
        <span className='mb-8 text-3xl font-bold text-rolling-stone'>About Us</span>
        <div className="flex flex-wrap gap-10 justify-center">
          {
            aboutUs.map((item, idx) => (
              <div className='flex items-center justify-between px-8 py-9 bg-athens-gray rounded-[10px] w-full md:w-5/12' key={idx}>
                <span className='text-2xl leading-7 text-black/[0.8]'>{item.title}</span>
                <Image src={`/assets/${item.imgUrl}`} alt={`about-us-${idx}`} width={item.width} height={item.height} />
              </div>
            ))
          }
        </div>
      </section>
    </Fragment>

  )
}

export default Home;
