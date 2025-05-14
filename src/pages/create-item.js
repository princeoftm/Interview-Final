import { useState, Fragment, useEffect } from "react";
import { useSelector } from 'react-redux'
import { ethers } from "ethers";
import ipfsClient from 'ipfs-http-client';
import { useRouter } from "next/router";
import LoadingSpin from "react-loading-spin";
import { errorAlert } from "../components/toastGroup";

import axios from 'axios'
import FormData from 'form-data'

// const projectId = '33f72aa1b4f441bc8f3a244da53533b4';   // <---------- your Infura Project ID

// const projectSecret = '614e888016e447c9b40d3639f1f10421';  // <---------- your Infura Secret
// // (for security concerns, consider saving these values in .env files)

// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const privateKey = "5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const projectId = "33f72aa1b4f441bc8f3a244da53533b4";
const projectSecret = '614e888016e447c9b40d3639f1f10421';  // <---------- your Infura Secret
const auth = 'Basic ' + btoa(projectId + ":" + projectSecret);

const client = ipfsClient.create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: auth,
  },
});

import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants";
import tokenABI from "../constants/abi/token"

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ToastContainer } from "react-toastify";
import Icon from "../components/Icon/Icon";
import Head from "next/head";

let contract
let tokenContractAddr

export default function CreateItem() {
  const [file, setFile] = useState({})
  const [image, setImage] = useState('')
  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
    price: 0,
    airdropAmount: 0,
    maxSupply: 0,
    category: "",
    email: ''
  });
  const reduxBlockchain = useSelector(state => state.user.blockchain)
  const provider = useSelector(state => state.user.provider)
  // const [blockchain, setBlockchain] = useState(reduxBlockchain)
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(false)

  useEffect(() => {
    if (!!provider) {
      const signer = provider.getSigner();

      if (reduxBlockchain === 'Ethereum')
        tokenContractAddr = ETHEREUM_SETTING.tokenContractAddr
      else if (reduxBlockchain === 'Binance')
        tokenContractAddr = BINANCE_SETTING.tokenContractAddr

      contract = new ethers.Contract(tokenContractAddr, tokenABI, signer);
    }
  }, [provider])

  async function onChange(e) {
    setImgLoading(true)
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async e => {
      setImage(reader.result)
    }
    setFile(file)
    // try {
    //   const added = await client.add(file, {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   console.log('url=============', url)
    //   setFileUrl(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
    setImgLoading(false)
  }
  async function pinToIpfs() {
    setLoading(true)
    const { name, description, price, airdropAmount, maxSupply, category, email } = formInput;
    if (!name || !description || !price || !category || maxSupply === 0) {
      errorAlert('please fill form data')
      return
    }

    let url
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log('url=============', url)
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: url,
      airdropAmount: airdropAmount,
      maxSupply: maxSupply,
      category,
      email
    });

    try {
      const added = await client.add(data);
      const tokenURI = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log('tokenURI==========', tokenURI)
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createToken(tokenURI, airdropAmount, maxSupply, price);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setLoading(false)
  }

  async function createToken(tokenURI, airdropAmount, maxSupply, fractionPrice) {
    const signer = provider.getSigner();
    /* next, create the item */
    const price1 = fractionPrice * 1000000000000000000

    let transaction = await contract.create(tokenURI, airdropAmount, maxSupply, price1.toString());
    let tx = await transaction.wait();

    const priceStr = price1.toString()

    console.log(tx);
    let event = tx.events[0];
    let value = event.args[3];
    let tokenId = value.toNumber();

    router.push("/own-list");
  }

  console.log('image:', image)

  return (
    <Fragment>
      <Head>
        <title>PayByMint - Create NFT</title>
      </Head>
      <div className="flex justify-center">
        <div className="w-11/12 md:w-1/2 flex flex-col pb-12">
          <label className="mt-8">NFT Name <button className="tooltip" ><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[0].desc}</span></button></label>
          <input
            placeholder="Asset Name"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
          <label className="mt-8">NFT Description <button className="tooltip"><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[1].desc}</span></button></label>
          <textarea
            placeholder="Asset Description"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <label className="mt-8">NFT Price in MATIC <button className="tooltip"><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[2].desc}</span></button></label>
          <input
            placeholder="Asset Price in MATIC"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          {/* <label className="mt-8">NFT Airdrop Amount <button className="tooltip"><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[3].desc}</span></button></label>
          <input
            placeholder="Asset Airdrop Amount"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, airdropAmount: e.target.value })
            }
          /> */}
          <label className="mt-8">NFT Fraction Max Supply <button className="tooltip"><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[4].desc}</span></button></label>
          <input
            placeholder="Asset Max Supply"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, maxSupply: e.target.value })
            }
          />
          <label className="mt-2">Category </label>
          <select
            defaultValue={""}
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, category: e.target.value })
            }
          >
            <option value={''} disabled>
              Category
            </option>
            <option value="Companies">Companies</option>
            <option value="Products">Products</option>
            <option value="Services">Services</option>
            <option value="Brand">Brand</option>
            <option value="Promotions">Promotions</option>
          </select>
          <label className="mt-8">Email Address <button className="tooltip"><Icon type="info" width={18} height={18} /><span className="tooltiptext">{infos[5].desc}</span></button></label>
          <input
            placeholder="Email"
            className="mt-1 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, email: e.target.value })
            }
          />
          <input type="file" name="Asset" className="my-4" onChange={onChange} />
          {!!image ? <img className="rounded mt-4" width="350" src={image} style={{ margin: 'auto' }} /> : ''}
          {imgLoading && <LoadingSpin size="34px" width="4px" />}
          <button
            onClick={() => pinToIpfs()}
            className="font-bold mt-4 bg-orange text-white rounded p-4 shadow-lg"
          >
            Create NFT
          </button>
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
      <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />
    </Fragment>
  );
}

const infos = [
  {
    title: "NFT Name",
    desc: 'Suitable as company name, brand name or name of product that NFT represents.'
  },
  {
    title: "NFT Description",
    desc: 'Brief description of NFT : Story, History, Mission, Utilities.'
  },
  {
    title: "NFT Price in MATIC",
    desc: 'Total Price of MATIC (the whole).'
  },
  {
    title: "NFT Airdrop Amount",
    desc: 'Recommended to equal number of fractions minted.'
  },
  {
    title: "NFT Fraction Max Supply",
    desc: 'Total number fractions contained in NFT.'
  },
  {
    title: "Email",
    desc: 'Every successful transaction is automatically sent to email address provided here s proof of payment.'
  },
]