import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from "react";
import { useSelector } from 'react-redux'
import AWS from 'aws-sdk'

import Icon from "../components/Icon/Icon";
import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";
import tokenABI from "../constants/abi/token";
import marketplaceABI from "../constants/abi/marketplace";
import { Contract, providers } from 'ethers';
import BigNumber from 'bignumber.js'
import { ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Typography } from '@mui/material';
import { errorAlert } from '../components/toastGroup';
import LoadingSpin from "react-loading-spin";
import axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import SES_CONFIG from '../constants/awsConfig.json'
import Head from 'next/head';

const AWS_SES = new AWS.SES(SES_CONFIG)

const MintAlert = withReactContent(Swal)
let tokenContractAddr, marketplaceContractAddr
let tokenContract, marketContract

export default function Sale() {
  const [showModal, setShowModal] = useState(false);
  const [showUnlistModal, setShowUnlistModal] = useState(false)

  const walletAddress = useSelector((state) => {
    return state.user.address;
  });

  const blockchain = useSelector((state) => {
    return state.user.blockchain
  })

  const provider = useSelector((state) => {
    return state.user.provider
  })

  const [fraction, setFraction] = useState(0)
  const [vfpEth, setVfpEth] = useState('0')
  const [frcCount, setFrcCount] = useState(0)
  const [tokenUrl, setTokenUrl] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalFraction, setTotalFraction] = useState(0)
  const [unlistCnt, setUnlistCnt] = useState(1)
  const [buyCnt, setBuyCnt] = useState(1)
  const [email, setEmail] = useState('')
  const [polygonPrice, setPolygonPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [balance, setBalance] = useState('')

  const router = useRouter();
  const { query } = useRouter()
  const { tokenId, seller, price, pay } = query

  useEffect(() => {
    const init = async () => {
      console.log('providers:', providers)
      console.log('loading:', provider)
      setLoading(true)
      // sendMail()
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
      tokenContract = new Contract(tokenContractAddr, tokenABI, signer)

      marketContract = new Contract(marketplaceContractAddr, marketplaceABI, signer)
      try {
        console.log('tokenId:', { tokenId })
        const tknUrl = await tokenContract.uri(tokenId)
        setTokenUrl(tknUrl)
        console.log('tokenurl:', tknUrl)

        const _fractionCount = await tokenContract.balanceOf(walletAddress || seller, tokenId)
        setTotalFraction(_fractionCount.toNumber())

        const blnc = await provider.getBalance(walletAddress)
        setBalance(blnc.toString())

        const metadt = (await axios.get(tknUrl)).data
        setDesc(metadt.description)
        setImage(metadt.image)
        setName(metadt.name)
        if (!!metadt.email) {
          setEmail(metadt.email)
        }

        const sales = await marketContract.getSaleTokensBySellerAndTokenId(seller, tokenId)
        console.log('sales:', sales)

        console.log('seller is:', seller, walletAddress)

        const prices = sales[0]
        setVfpEth(price.toString())
        setTotalPrice(BigNumber(price.toString()).div(BigNumber('1000000000000000000')).toNumber())
        const amounts = sales[1]
        console.log('amounts:', amounts)
        const index = prices.findIndex(prc => prc.toString() === price.toString())
        if (index < 0) {
          router.push('/')
        }
        console.log('current amount:', amounts[index], amounts[index].toNumber())
        setFrcCount(amounts[index].toNumber())
        setUnlistCnt(amounts[index].toNumber())

        const maxSupply = await tokenContract.maxSupply(tokenId)
        setFraction(maxSupply.toNumber())
        const polygon = (await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')).data
        setPolygonPrice(polygon['matic-network']['usd'])
      } catch (error) {
        console.log('error', error)
      }
      setLoading(false)
    }

    init()
  }, [walletAddress, tokenId, provider])


  const onUnlist = () => {
    setShowUnlistModal(true)
  }

  const sendMail = async (txNumber) => {
    var params = {
      Destination: { /* required */
        CcAddresses: [
          email
          /* more items */
        ],
        ToAddresses: [
          email
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: "UTF-8",
            Data: `<div>${walletAddress} has successfully bought ${buyCnt} ${name} on transaction ${txNumber}</div>`
          },
          Text: {
            Charset: "UTF-8",
            Data: `${walletAddress} successfully bought ${buyCnt} ${name} on transaction ${txNumber}`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Poulina Marketplace'
        }
      },
      Source: 'omuniverse823@gmail.com', /* required */
      ReplyToAddresses: [
        'omuniverse823@gmail.com',
        /* more items */
      ],
    };

    // Create the promise and SES service object
    try {
      const data = await AWS_SES.sendEmail(params).promise();
      console.log('email sent:', data)
    } catch (err) {
      console.log('error:', err)
    }
    /*
    var sendPromise = AWS_SES.sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
      function (data) {
        console.log(data.MessageId);
      }).catch(
        function (err) {
          console.error(err, err.stack);
        });
        */
  }

  const buy = async () => {
    const ttlPrice = BigNumber(price).multipliedBy(buyCnt)
    console.log('buying:', tokenId, price, buyCnt, walletAddress, ttlPrice.toString())
    if (buyCnt > frcCount) {
      return errorAlert('Insufficient token to buy')
    }
    if (buyCnt === 0) {
      return errorAlert('Buy more than 1 token')
    }
    if (ttlPrice.gt(BigNumber(balance))) {
      return errorAlert('Insufficient fund')
    }
    setLoading(true)
    try {
      let transaction = await marketContract.purchase(seller, tokenId, price, buyCnt, { from: walletAddress, value: ttlPrice.toString() })
      let tx = await transaction.wait()
      await sendMail(tx.transactionHash)
      MintAlert.fire({
        title:
          <Typography component="h2">
            Congratulation!
          </Typography>,
        html:
          <Typography component="p">
            You bought the fractions.
          </Typography>,
        icon: 'success'
      })
      setShowModal(false)
      router.push("/own-list");
    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }

  const unlist = async () => {
    setLoading(true)
    if (unlistCnt === 0) {
      return errorAlert('Unlist more than 1 token')
    }
    if (unlistCnt > frcCount) {
      return errorAlert('Exceeds listed amount')
    }
    try {
      let transaction = await marketContract.cancelSale(tokenId, price, unlistCnt)
      let tx = await transaction.wait();
      MintAlert.fire({
        title:
          <Typography component="h2">
            Congratulation!
          </Typography>,
        html:
          <Typography component="p">
            You unlisted the fractions.
          </Typography>,
        icon: 'success'
      })
      setShowUnlistModal(false)
      router.push("/own-list");
    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }

  console.log('bucynt:', buyCnt)

  return (
    <>
      <Head>
        <title>{name} PayByMint</title>
      </Head>
      <section className="w-11/12 max-w-6xl mx-auto my-7">
        <FractionNFTInfo
          tokenId={tokenId}
          name={name}
          description={description}
          tokenUrl={tokenUrl}
          image={image}
          loading={loading}
          vfpEth={vfpEth}
          fraction={fraction}
          totalFraction={totalFraction}
          frcCount={frcCount}
          walletAddress={walletAddress}
          seller={seller}
          onPay={() => {
            setShowModal(true)
          }}
          onUnlist={onUnlist}
          pay={pay}
        />
        <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />

        {showModal && <BuyModal setShow={setShowModal} vfpEth={vfpEth} frcCount={buyCnt} setFrcCount={setBuyCnt} loading={loading} buy={buy} maxFraction={frcCount} isPay={pay} polygonPrice={polygonPrice} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />}
        {showUnlistModal && <UnlistModal setShow={setShowUnlistModal} vfpEth={vfpEth} frcCount={unlistCnt} setFrcCount={setUnlistCnt} loading={loading} unlist={unlist} maxFraction={frcCount} />}
      </section>
    </>
  );
}

// const Activity = ({ type, date, ethAmount, dollarAmount }) => {
//   return (
//     <div className="bg-[#fff2ec] p-4 rounded flex justify-between mb-2">
//       <div className="text-black text-opacity-[0.52] text-sm">
//         <span className="font-medium mr-3">{type}</span>
//         <span>{date}</span>
//       </div>
//       <div>
//         <p className="flex items-center pl-3">
//           <span className="flex gap-1 items-center">
//             <Icon type="ether" className="w-4" />
//             <span className="text-trout">ETH</span>
//           </span>
//           <span className="ml-4">
//             <span className="font-bold">{ethAmount}</span>{" "}
//             {/* <span className="text-trout">(${dollarAmount})</span> */}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// const CreatorInfo = ({
//   userImg = "https://i.imgur.com/QQQQQQQ.png",
//   name = "Beverly Yassefu",
//   deals = "$ 456 k",
//   followers = "24 k",
//   following = "6 k",
//   wallet = "2672tgUNHJQ912J997Ygf6677F4ja aQTYSFVU280Q8JXDQDQ",
// }) => {
//   return (
//     <div className="border border-orange rounded-md h-fit creator-info">
//       <div className="border-b border-b-orange p-5">
//         <h4 className="mb-7 text-black text-sm font-medium text-opacity-60">
//           Creator info
//         </h4>
//         <div className="flex">
//           <img
//             src={userImg}
//             alt="creator"
//             className="w-10 h-auto rounded-full"
//           />
//           <div className="ml-5">
//             <p>{name}</p>
//             <button className="text-orange text-sm font-medium">Follow</button>
//           </div>
//         </div>
//       </div>
//       <div className="border-b border-b-orange flex">
//         <div className="p-5 flex-1">
//           <p className="mb-2 text-black text-opacity-70 font-medium text-sm">
//             Deals
//           </p>
//           <p className="font-medium">{deals}</p>
//         </div>
//         <div className="p-5 border-l border-l-orange flex-1">
//           <p className="mb-2 text-black text-opacity-70 font-medium text-sm">
//             Followers
//           </p>
//           <p className="font-medium">{followers}</p>
//         </div>
//         <div className="p-5 border-l border-l-orange flex-1">
//           <p className="mb-2 text-black text-opacity-70 font-medium text-sm">
//             Following
//           </p>
//           <p className="font-medium">{following}</p>
//         </div>
//       </div>
//       <div className="p-5 flex justify-between items-center max-w-sm">
//         <div>
//           <p className="mb-2 text-black text-opacity-70 font-medium text-sm">
//             Wallet Info
//           </p>
//           <p className="font-medium text-orange">{wallet}</p>
//         </div>
//         <div>
//           <button className="w-11 h-11">
//             {" "}
//             <img
//               width="40"
//               height="40"
//               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFI0lEQVRogdWaW2wUVRjHf+fMbgulNUgBubXQ0kqxQikWWhOJQqLxRRQhVkWMPgBqoiUGoiYmxsREFImPiCUxsYpWRIxvxARiEAVdLm0tFLm02EpEaUG6Bdud2c+H7ZYWuztnZ7cu/J52Zr7L/9u5nfOdUaQAaW2ehHKWIFKJViUIhUAukN1vEgQ6UZwhLC3AAfDtVQWlfySbW3kW3XE8F8deicgqoMJbEH5Gqzos33Y1bXanlxAJFyAdDdMI6fUoWQ1keUk6DD0oatHh91TevN8TcTQuQAIBPxP8LyDqLa5dGqnmCiKbsLPeVsXFvSYORgXImYZZaFUPlCUlzxg5iiPVaua8X90stWuotoblaBXgfxMPoOZh6YC0NS1zs4xbgLQ2PgPqc0bukolHDsgOaW16Lp5RzAKktXEtio8AX8qlmWOhZIucbXoxlsGw94C0NSwHVQ9YppnkahDpOgeOnaBEH2rcFNTouCfZQVihCuZ+ff2B/xQg7c1FOM4h4BaT/NLzN6EvNuIc2p24+CiWD6viQfyPvYrKipk2iLBAFcxtGbxzSAHS3JzBGOcnTG/YUC+9764i3NHibmuAzishc0Md+DNjmRzhQl+lqqgIDfgMOZzlvEwCTxt735cpEw8Qbm/B/n5nPJNyxmfWDN4xUIC0H52K4nWjTKHIOybcvC9xlS6Ef3GLKW9I27HJ0a1rZ8C2NgBj3BLYez4ltOv9SKjgJW8q48kLXnQzyQZ7fXRDQ//ALDK2iYtz+FtCO94Buy85lcmzVjqO50L0DDj2SgwGZs4Pu0ZWljljsEOPQ7SAyJDYFenuGkFNCaLU0wC6/4a4K81yEkdkgZxpuk2DvZgkJjZpRKG4TyNSmW4lntFSpdGqJN06PCPM0ghF6daRBMUaGJtuFd5RYzXpmaykCMlxnVLe6GgiTaebFNWtAdfR042LXNIoTqdbRhKc1P29ypsTxQkNHEi3Du+oHzWi9wCSbikeEBy+06pwznmEgJGL7n/qhsMAqOzUvwNVzjhT04OqcM75iCKt6oyCZ98KgFyOdMJ16aKEBbqh7zSNKXUQndBYvu1Aj5uLmloMgHPyEPRexbdoBTp/tjelw6Dz78B3z3IT0x58GfXQX4CaNrsTRa2blzX/gciPf4KEdm8DfyYZNbVYlQ+BlUQH0vJjVS0lY10t+DIMHOSD6ILIwERG2o9OxdEncOlM9G2pwWncC0rjr34N373VA0WFO721FnXuFBhlPCTrRqzbo8tTQztzZxtfQdgYz1u6u+jd+GSkDwroonKsqofRkwriddRiokZloybmJ+KxXs2Ys3lga4i4QMDP+IyDQHm8ENJ1jr4tNYQ7TiSmdhgyVm/Gmn+/qflhLvRVDW4tem/uOjb2/q9w9u8k/NvxRDRHyByNf+lL+JasNPUIEpYKVVg25F+L0V5vWgayA8P2ulwNIhfPg220rAXaQo/Pg1HGa4QOWh5V+WXfXH8gZjdCzjauQdhqmmEEEZA1akbZtuEOxpzQqOlzP0R4FvDY9E8JDsLzscSDQT9IWhsfQfExkJNSae5cRsuq4S6bwZgts54+Uoxl1ePydEohh7GsapVXesrN0GhOrGaWn2R650KUrAO6k5YXmyuIvEmPdbeJePDyqUHbsclgbwDWYLCeYEgPsBWxNiX6AUhyH3vYoSeAp4CFHmIJcBD4BMv6TOWVemp9p6SpK6caJmLpxWipQigBCoAJDP3c5i+gFUULYXUAJ7xXFZX9mWzufwG5GLMEyTAbGAAAAABJRU5ErkJggg=="
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const FractionNFTInfo = ({
  tokenId,
  name = "Directions Real Estate Currency",
  description,
  edition = "3546/7362",
  set = "The Beverly Real Estate",
  currentValueEth = "0.9",
  currentValueDollar = "32.885",
  tokenUrl,
  image,
  loading,
  vfpEth,
  frcCount,
  vfpDollar = "0.32885",
  fraction,
  walletAddress,
  seller,
  totalFraction,
  onPay,
  pay,
  onUnlist
}) => {
  const shareNFT = () => {
    let shareLink = window.location.href;
    if (!shareLink.includes('?pay=true')) shareLink += '?pay=true';
    if (navigator.share) {
      navigator.share({
        title: name + ' - PayByMint',
        text: `Pay with NFT (${name}) on PayByMint`,
        url: shareLink
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Unable to share. Not supported.')
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4">
        <img
          src={image !== '' ? image : ''}
          alt="nft"
          className="w-[350px] h-[350px] shadow-2xl rounded-md"
        />
        <div className="relative shadow-2xl rounded-md p-6 flex-1 flex flex-col justify-between">
          <button className="flex items-center absolute top-2 right-4 text-rolling-stone text-sm" onClick={shareNFT}>
            <Icon width="20" type="share" className="mr-1" />
            <span>Share</span>
          </button>
          <h2 className="font-bold text-xl">{name}</h2>
          <div>
            <span className="text-trout text-sm text-opacity-50 font-medium">
              Description :
            </span>
            <span className="text-trout text-sm font-medium">{description}</span>
          </div>
          {/* <div>
            <span className="text-trout text-sm text-opacity-50 font-medium">
              Edition :
            </span>
            <span className="text-trout text-sm font-medium">{edition}</span>
          </div>
          <div>
            <span className="text-trout text-sm text-opacity-50 font-medium">
              Set :
            </span>
            <span className="text-trout text-sm font-medium">{set}</span>
          </div> */}
          <div className="flex">
            <div className="p-4 pl-0 pr-6">
              <p className="text-trout text-opacity-50 text-sm font-medium">
                Current Value
              </p>
              <p className="flex items-center">
                <span>
                  <Icon type="ether" />
                </span>
                <span className="ml-1">
                  <span className="font-bold">{BigNumber(vfpEth).multipliedBy(BigNumber(frcCount)).dividedBy(BigNumber('1000000000000000000')).toString()}</span>{" "}
                  {/* <span className="text-trout">(${currentValueDollar})</span> */}
                </span>
              </p>
            </div>
            <div className="p-4 pr-6  ">
              <p className="text-trout text-opacity-50 text-sm border-l border-l-light-orange pl-3 font-medium">
                Value per fraction
              </p>
              <p className="flex items-center border-l border-l-light-orange pl-3">
                <span>
                  <Icon type="ether" />
                </span>
                <span className="ml-1">
                  <span className="font-bold">{BigNumber(vfpEth).dividedBy(BigNumber('1000000000000000000')).toString()}</span>{" "}
                  {/* <span className="text-trout">(${vfpDollar})</span> */}
                </span>
              </p>
            </div>
            <div className="p-4 pr-6  ">
              <p className="text-trout text-opacity-50 text-sm border-l border-l-light-orange pl-3 font-medium">
                Fraction
              </p>
              <p className="flex items-center border-l border-l-light-orange pl-3">
                <span>
                  <Icon type="ether" />
                </span>
                <span className="ml-1">
                  <span className="font-bold">{frcCount}</span>{" "}
                </span>
              </p>
            </div>
          </div>
          {
            !!walletAddress && <div className="flex items-center">
              {
                walletAddress?.toLowerCase() === seller?.toLowerCase() ? <button
                  onClick={onUnlist}
                  className="bg-vermilion rounded-3xl py-2 px-7 text-white font-bold"
                >
                  Unlist
                </button> : <button
                  onClick={() => onPay()}
                  className="bg-vermilion rounded-3xl py-2 px-7 text-white font-bold"
                >
                  Pay By Mint
                </button>
              }
            </div>
          }
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
};

const BuyModal = ({
  amountEth = "0.005",
  amountDollar = "100",
  fraction = "10",
  setShow,
  vfpEth,
  frcCount,
  maxFraction,
  setFrcCount,
  loading,
  polygonPrice,
  buy,
  email,
  isPay,
  totalPrice,
  setTotalPrice,
}) => {
  const action = "Pay Now";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center p-4 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#C4C4C4" />
            <path
              d="M16.8546 16.0001L20.9464 11.9084C21.1819 11.6729 21.1819 11.2922 20.9464 11.0567C20.7108 10.8212 20.3302 10.8212 20.0946 11.0567L16.0029 15.1484L11.9112 11.0567C11.6756 10.8212 11.295 10.8212 11.0595 11.0567C10.8239 11.2922 10.8239 11.6729 11.0595 11.9084L15.1512 16.0001L11.0595 20.0918C10.8239 20.3274 10.8239 20.708 11.0595 20.9436C11.1769 21.061 11.3311 21.12 11.4853 21.12C11.6395 21.12 11.7937 21.061 11.9112 20.9436L16.0029 16.8518L20.0946 20.9436C20.2121 21.061 20.3663 21.12 20.5205 21.12C20.6747 21.12 20.8289 21.061 20.9463 20.9436C21.1819 20.708 21.1819 20.3274 20.9463 20.0918L16.8546 16.0001Z"
              fill="white"
            />
          </svg>
        </button>
        <h4 className="text-cape-cod font-medium mb-4">Total Bill</h4>
        <div className="bg-vermilion bg-opacity-20 rounded-[50%] p-4 w-28 mx-auto flex justify-center items-center">
          <img width="60" src="/assets/dollar.svg" alt="dollar" />
        </div>
        <p className="text-shuttle-gray mt-5">Amount</p>
        <p className="flex items-center justify-center">
          <span>
            <Icon type="ether" />
          </span>
          <span className="ml-1">
            <span className="font-bold">{BigNumber(frcCount).multipliedBy(BigNumber(vfpEth)).dividedBy(BigNumber('1000000000000000000')).toString()}</span>{" "}
            {/* <span className="text-trout">(${amountDollar})</span> */}
          </span>
        </p>
        <p className="mt-1">
          <span className="ml-1">
            <span className="font-bold">{frcCount} Fraction</span>{" "}
            {/* <span className="text-trout">(${amountDollar})</span> */}
          </span>
        </p>
        <p className="flex items-center justify-center border-b border-b-gray-300">
          <span className="ml-1">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '5px', marginBottom: '15px' }}><input type="number" className="form-control" style={{ width: '100px' }} max={maxFraction * polygonPrice} onChange={e => { setTotalPrice(e.target.value); setFrcCount(Math.floor(BigNumber(e.target.value).div(BigNumber(polygonPrice)).times(BigNumber('1000000000000000000')).div(vfpEth).toNumber())) }} value={totalPrice} /> USD</div>
            {/* <span className="font-bold">{fraction}</span>{" "} */}
          </span>
        </p>
        <button className="bg-orange text-white mx-auto px-6 py-2 rounded-md mt-5" onClick={() => buy()}>
          {!loading ? action : <LoadingSpin size="34px" width="4px" />}
        </button>
      </div>
    </div>
  );
};

const UnlistModal = ({
  amountEth = "0.005",
  amountDollar = "100",
  fraction = "10",
  setShow,
  vfpEth,
  frcCount,
  maxFraction,
  setFrcCount,
  loading,
  unlist
}) => {
  console.log('current fractions:', frcCount, vfpEth)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center p-4 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#C4C4C4" />
            <path
              d="M16.8546 16.0001L20.9464 11.9084C21.1819 11.6729 21.1819 11.2922 20.9464 11.0567C20.7108 10.8212 20.3302 10.8212 20.0946 11.0567L16.0029 15.1484L11.9112 11.0567C11.6756 10.8212 11.295 10.8212 11.0595 11.0567C10.8239 11.2922 10.8239 11.6729 11.0595 11.9084L15.1512 16.0001L11.0595 20.0918C10.8239 20.3274 10.8239 20.708 11.0595 20.9436C11.1769 21.061 11.3311 21.12 11.4853 21.12C11.6395 21.12 11.7937 21.061 11.9112 20.9436L16.0029 16.8518L20.0946 20.9436C20.2121 21.061 20.3663 21.12 20.5205 21.12C20.6747 21.12 20.8289 21.061 20.9463 20.9436C21.1819 20.708 21.1819 20.3274 20.9463 20.0918L16.8546 16.0001Z"
              fill="white"
            />
          </svg>
        </button>
        <h4 className="text-cape-cod font-medium mb-4">Total Bill</h4>
        <div className="bg-vermilion bg-opacity-20 rounded-[50%] p-4 w-28 mx-auto flex justify-center items-center">
          <img width="60" src="/assets/dollar.svg" alt="dollar" />
        </div>
        <p className="text-shuttle-gray mt-5">Amount</p>
        <p className="flex items-center justify-center">
          <span>
            <Icon type="ether" />
          </span>
          <span className="ml-1">
            <span className="font-bold">{BigNumber(frcCount).multipliedBy(BigNumber(vfpEth)).dividedBy(BigNumber('1000000000000000000')).toString()}</span>{" "}
            {/* <span className="text-trout">(${amountDollar})</span> */}
          </span>
        </p>
        <p className="text-shuttle-gray mt-5">NFT Fraction</p>
        <p className="flex items-center justify-center border-b border-b-gray-300">
          <span className="ml-1">
            <input type="number" className="form-control" style={{ margin: '20px', width: '100px' }} min="1" max={frcCount} onChange={e => setFrcCount(e.target.value)} value={frcCount} />
            {/* <span className="font-bold">{fraction}</span>{" "} */}
          </span>
        </p>
        <button className="bg-orange text-white mx-auto px-6 py-2 rounded-md mt-5" onClick={() => unlist()}>
          {!loading ? "Unlist" : <LoadingSpin size="34px" width="4px" />}
        </button>
      </div>
    </div>
  );
};
