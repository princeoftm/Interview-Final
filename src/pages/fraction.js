import { useRouter } from 'next/router';
import { useEffect, useRef, useState, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import AWS from 'aws-sdk'
import Link from 'next/link'

import Icon from "../components/Icon/Icon";
import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";
import tokenABI from "../constants/abi/token";
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js'
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Typography } from '@mui/material';
import { errorAlert } from '../components/toastGroup';
import LoadingSpin from "react-loading-spin";
import axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import SES_CONFIG from '../constants/awsConfig.json'

const AWS_SES = new AWS.SES(SES_CONFIG)

const MintAlert = withReactContent(Swal)
let tokenContractAddr

export default function Fraction() {
  const [showModal, setShowModal] = useState(false);
  const actRef = useRef();

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
  const [frcCount, setFrcCount] = useState(1)
  const [totalSupply, setTotalSupply] = useState(0)
  const [tokenContract, setTokenContract] = useState({})
  const [tokenUrl, setTokenUrl] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalFraction, setTotalFraction] = useState(0)
  const [polygonPrice, setPolygonPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [balance, setBalance] = useState('')

  const router = useRouter();
  const { query } = useRouter()
  const tokenId = query.tokenId

  useEffect(() => {
    console.log('test bignum:',BigNumber(1.5).toString())
    const init = async () => {
      setLoading(true)
      if (provider !== null) {
        let signer = provider.getSigner()

        if (blockchain === 'Ethereum')
          tokenContractAddr = ETHEREUM_SETTING.tokenContractAddr
        else if (blockchain === 'Binance')
          tokenContractAddr = BINANCE_SETTING.tokenContractAddr

        const _tokenContract = new ethers.Contract(tokenContractAddr, tokenABI, signer)
        setTokenContract(_tokenContract)

        try {
          const tknUrl = await _tokenContract.uri(tokenId)
          setTokenUrl(tknUrl)

          const _fractionCount = await _tokenContract.balanceOf(walletAddress, tokenId)
          setTotalFraction(_fractionCount.toNumber())

          const blnc = await provider.getBalance(walletAddress)
          setBalance(blnc.toString())

          const metadt = (await axios.get(tknUrl)).data
          const crt = await _tokenContract.creator(tokenId)
          setCreator(crt)
          setImage(metadt.image)
          setName(metadt.name)
          setDescription(metadt.description)
          if (!!metadt.email) {
            setEmail(metadt.email)
          }
          const price = await _tokenContract.fractionPrice(tokenId)
          setVfpEth(price.toString())
          setTotalPrice(BigNumber(price.toString()).div(BigNumber('1000000000000000000')).toNumber())
          const ttlSpl = await _tokenContract.totalSupply(tokenId)
          setTotalSupply(ttlSpl.toNumber())

          const maxSupply = await _tokenContract.maxSupply(tokenId)
          setFraction(maxSupply.toNumber())
          const polygon = (await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')).data
          setPolygonPrice(polygon['matic-network']['usd'])
        } catch (error) {
          console.log('error', error)
        }
      }
      setLoading(false)
    }

    init()
  }, [walletAddress, tokenId, provider])


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
            Data: `<div>${walletAddress} has successfully minted ${frcCount} ${name} on transaction ${txNumber}</div>`
          },
          Text: {
            Charset: "UTF-8",
            Data: `${walletAddress} has successfully minted ${frcCount} ${name} on transaction ${txNumber}`
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

  const mint = async () => {
    if (frcCount > fraction - totalSupply) {
      return errorAlert('Fraction count exceed!')
    }

    if (frcCount === 0) {
      return errorAlert('Mint more than 1 token')
    }

    toast.dismiss()
    try {
      const value = BigNumber(frcCount).multipliedBy(BigNumber(vfpEth))
      if (value.gt(BigNumber(balance))) {
        return errorAlert('Insufficient fund')
      }
      setLoading(true)
      let transaction = await tokenContract.mint(tokenId, frcCount, {
        value: value.toString()
      })
      let tx = await transaction.wait();
      await sendMail(tx.transactionHash)
      MintAlert.fire({
        title:
          <Typography component="h2">
            Congratulation!
          </Typography>,
        html:
          <Typography component="p">
            You got the fractions.
          </Typography>,
        icon: 'success'
      })
      setShowModal(false)
      router.push("/list-item?tokenId=" + tokenId);
    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }

  return (
    <section className="w-11/12 max-w-6xl mx-auto my-7">
      <FractionNFTInfo
        tokenId={tokenId}
        name={name}
        tokenUrl={tokenUrl}
        image={image}
        description={description}
        loading={loading}
        vfpEth={vfpEth}
        fraction={fraction}
        totalFraction={totalFraction}
        creator={creator}
        walletAddress={walletAddress}
        onPay={() => setShowModal(true)}
      />
      <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />
      {/* <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div
          ref={actRef}
          className="border border-orange rounded-md p-6 md:flex-1"
        >
          <h3 className="mb-2">Activities</h3>
          <div className="overflow-y-scroll h-[95%]">
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Rented"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Created"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Rented"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Created"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
            <Activity
              type="Sold"
              date="01/01/2022"
              ethAmount="0.9"
              dollarAmount="100"
            />
          </div>
        </div>
        <CreatorInfo />
      </div> */}
      {showModal && <ConfirmationModal setShow={setShowModal} vfpEth={vfpEth} frcCount={frcCount} setFrcCount={setFrcCount} loading={loading} mint={mint} maxFraction={fraction - totalFraction} polygonPrice={polygonPrice} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />}
    </section>
  );
}



const FractionNFTInfo = ({
  tokenId,
  name = "Directions Real Estate Currency",
  description,
  creator,
  walletAddress,
  image,
  loading,
  vfpEth,
  totalFraction,
  onPay
}) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4">
        <img
          src={image !== '' ? image : ''}
          alt="nft"
          className="w-[350px] h-[350px] border shadow-2xl rounded-md"
        />
        <div className="relative border shadow-2xl rounded-md p-6 flex-1 flex flex-col justify-between">
          <button className="flex items-center absolute top-2 right-4 text-rolling-stone text-sm">
            <Icon width="20" type="share" className="mr-1" />
            <span>Share</span>
          </button>
          <h2 className="font-bold text-xl">{name}</h2>
          <div>
            <span className="text-trout text-sm text-opacity-50 font-medium">
              Description : {' '}
            </span>
            <span className="text-trout text-sm font-medium">{description}</span>
          </div>

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
                  <span className="font-bold">{BigNumber(vfpEth).multipliedBy(BigNumber(totalFraction)).dividedBy(BigNumber('1000000000000000000')).toString()}</span>{" "}
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
                  <span className="font-bold">{totalFraction}</span>{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center">
              <button
                onClick={onPay}
                className="bg-vermilion rounded-3xl py-2 px-7 text-white font-bold"
              >
                Pay by Mint
              </button>

            <Link href={`/list-item?tokenId=${tokenId}`}><a
              className="bg-vermilion rounded-3xl py-2 px-7 text-white font-bold ml-2"
            >
              List for Sale
            </a></Link>
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
};

const ConfirmationModal = ({
  setShow,
  vfpEth,
  frcCount,
  maxFraction,
  setFrcCount,
  loading,
  polygonPrice,
  totalPrice,
  setTotalPrice,
  mint
}) => {
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
        <p className="flex items-center justify-center mt-1">
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
        <button className="bg-orange text-white mx-auto px-6 py-2 rounded-md mt-5" onClick={() => mint()}>
          {!loading ? "Mint Now" : <LoadingSpin size="34px" width="4px" />}
        </button>
      </div>
    </div>
  );
};
