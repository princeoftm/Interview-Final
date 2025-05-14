import { Contract, ethers, BigNumber } from 'ethers';
import { useRouter } from 'next/router'
import {
  tokenContractAddr,
  marketplaceContractAddr,
  CHAINID,
  RPC_URL,
  NAME,
  SYMBOL,
  ETHEREUM_SETTING,
  BINANCE_SETTING
 } from '../../constants/index'

 import tokenABI from '../../constants/abi/token';
 import marketplaceABI from '../../constants/abi/marketplace';

 import { BscConnector } from '@binance-chain/bsc-connector'
import detectEthereumProvider from '@metamask/detect-provider';
import { DeFiWeb3Connector } from 'deficonnect';
import WalletConnectProvider from '@deficonnect/web3-provider';
import { toast } from 'react-toastify';
// import {createSuccessfulTransactionToastContent, sliceIntoChunks} from '../utils';
// import { nanoid } from 'nanoid';
import { _appAuthInitFinished } from './init';
import { captureException } from '@sentry/react';
import Web3Modal from 'web3modal';
// import agent from '../api'

import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_PROFILE,
  LOAD_ARTISTS,
  LOAD_WEB3MODAL,
  // custom
  ACCOUNT_CHANGED,
  ON_CORRECT_CHAIN,
  ON_PROVIDER,
  ON_BASIC_ACCOUNT_DATA,
  CONNECTING_WALLET,
  ON_LOGOUT,
  SET_SHOW_WRONG_CHAIN_MODAL,
  UPDATE_BLOCKCHAIN
} from '../actionTypes/user'

export const connectWallet = wallet => ({ type: CONNECT_WALLET, wallet })

export const disconnectWallet = () => ({ type: DISCONNECT_WALLET })

export const updateProfile = userInfo => ({ type: UPDATE_PROFILE, userInfo })

export const loadArtists = artists => ({ type: LOAD_ARTISTS, artists })

export const loadWeb3Modal = web3Modal => ({ type: LOAD_WEB3MODAL, web3Modal})

export const accountChanged = payload => ({ type: ACCOUNT_CHANGED, payload})

export const onCorrectChain = correctChain => ({ type: ON_CORRECT_CHAIN, correctChain})

export const onProvider = payload => ({ type: ON_PROVIDER, payload })

export const onBasicAccountData = payload => ({ type: ON_BASIC_ACCOUNT_DATA, payload })

export const connectingWallet = wallet => ({ type: CONNECTING_WALLET, wallet})

export const onLogout = payload => ({ type: ON_LOGOUT, payload })

export const setShowWrongChainModal = status => ({ type: SET_SHOW_WRONG_CHAIN_MODAL, status })

export const updateBlockchain = blockchain => ({ type: UPDATE_BLOCKCHAIN,  blockchain})

export const connectAccount = (firstRun = false) =>
  async (dispatch) => {
    const providerOptions = {
      injected: {
        display: {
          logo: '../../assets/MetaMask-icon-fox.svg',
          name: 'MetaMask',
          description: 'Connect with MetaMask in your browser',
        },
        package: null,
      },
      // 'custom-defiwallet': {
      //   display: {                   
      //     logo: '../../assets/cdc_logo.svg',
      //     name: 'Crypto.com DeFi Wallet',
      //     description: 'Connect with the CDC DeFi Wallet',
      //   },
      //   options: {},
      //   package: WalletConnectProvider,
      //   connector: async (ProviderPackage, options) => {
      //     const connector = new DeFiWeb3Connector({
      //       supportedChainIds: [4],
      //       rpc: { 4: 'https://evm.cronos.org' },
      //       pollingInterval: 15000,
      //       metadata: {
      //         icons: '../../assets/cdc_logo.svg',
      //         description: 'Cronos NFT Marketplace',
      //       },
      //     })

      //     await connector.activate()
      //     let provider = await connector.getProvider()
      //     return provider;
      //   },
      // },

      "custom-binancechainwallet": {
        display: {
          logo: "../../assets/binance-logo.svg",
          name: "Binance Chain Wallet",
          description: "Connect to your Binance Chain Wallet"
        },
        package: true,
        connector: async () => {
          
         const bsc = new BscConnector({
            supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
          })

          // invoke method on bsc e.g.
          await bsc.activate();
          await bsc.getAccount();
          await bsc.getChainId();

          let provider = null;
          if (typeof window.BinanceChain !== 'undefined') {
            provider = window.BinanceChain;
            try {
              await provider.request({ method: 'eth_requestAccounts' })
            } catch (error) {
              throw new Error("User Rejected");
            }
          } else {
            throw new Error("No Binance Chain Wallet found");
          }

           console.log('provider loading in bsc wallet', provider)

          return provider;
        }
      }
    };
    
    const web3ModalWillShowUp = !localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')

    if (process.env.NODE_ENV !== 'production') {
      console.log('web3ModalWillShowUp: ', web3ModalWillShowUp)
    }
    
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    })

    const web3provider = await web3Modal
      .connect()
      .then((web3provider) => web3provider)
      .catch((error) => {
        captureException(error, { extra: { firstRun } })
        console.log('Could not get a wallet connection', error)
        return null;
      })
      
    if (!web3provider) {
      dispatch(onLogout())
      return;
    }

    try {
      dispatch(connectingWallet({ connecting: true }))
      const provider = new ethers.providers.Web3Provider(web3provider)

      const cid = await web3provider.request({
        method: 'net_version',
      })

      console.log('provider===============', provider)

      const blockchain = localStorage.getItem('blockchain')
      let _chainId
      if(!!blockchain){
        _chainId = blockchain === 'Ethereum' ? ETHEREUM_SETTING.CHAINID : BINANCE_SETTING.CHAINID
      } else 
        _chainId = ETHEREUM_SETTING.CHAINID
                             
      const correctChain = cid === _chainId || parseInt(cid) === Number(_chainId)

      console.log('==================', correctChain)

      const accounts = await web3provider.request({
        method: 'eth_accounts',
        params: [{ chainId: cid }],
      })

      const address = accounts[0];
      console.log('address============', address)
      // if(address !== '') {
      //   const res = await agent.user.getUser(address)
      //   if (res.data !== null) {
      //       dispatch(updateProfile(res.data))
      //   }
      // }
      const signer = provider.getSigner()

      if (!correctChain) {
        if (firstRun) {
          dispatch(_appAuthInitFinished())
        }
        await dispatch(setShowWrongChainModal(true))
        
      }

      //console.log(correctChain)
      await dispatch(
        onBasicAccountData({
          address: address,
          provider: provider,
          web3modal: web3Modal,

          needsOnboard: false,
          correctChain: correctChain,
        })
      )
      if (firstRun) {
        dispatch(_appAuthInitFinished())
      }

      web3provider.on('DeFiConnectorDeactivate', (error) => {
        dispatch(onLogout())
      })

      web3provider.on('disconnect', (error) => {
        dispatch(onLogout())
      })

      web3provider.on('accountsChanged', (accounts) => {
        dispatch(onLogout())
        dispatch(connectAccount())
      })

      web3provider.on('DeFiConnectorUpdate', (accounts) => {
        window.location.reload()
      })

      web3provider.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.

        window.location.reload()
      })

      let ac;
      let mc;
      let code;
      let balance;
      // let ebisu;

      if (signer && correctChain) {
        ac = new Contract(tokenContractAddr, tokenABI, signer)
        mc = new Contract(marketplaceContractAddr, marketplaceABI, signer)

        try {
          balance = ethers.utils.formatEther(await provider.getBalance(address))
        } catch (error) {
          console.log('Error checking CRO balance', error)
        }
      }

      await dispatch(
        accountChanged({
          address: address,
          provider: provider,
          web3modal: web3Modal,
          needsOnboard: false,
          correctChain: correctChain,
          addressesContract: ac,
          marketplaceContract: mc,
          balance: balance,
          // isMember: ownedVip > 0 || ownedFounder > 0,
        })
      )
    } catch (error) {
      captureException(error, {
        extra: {
          firstRun,
          WEB3_CONNECT_CACHED_PROVIDER: localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER'),
          DeFiLink_session_storage_extension: localStorage.getItem('DeFiLink_session_storage_extension'),
        },
      })
      if (firstRun) {
        dispatch(_appAuthInitFinished())
      }
      console.log(error)
      console.log('Error connecting wallet!')
      await web3Modal.clearCachedProvider()
      dispatch(onLogout())
    }
    dispatch(connectingWallet({ connecting: false }))
  };

export const initProvider = () => async (dispatch) => {
  const ethereum = await detectEthereumProvider()

  if (ethereum == null || ethereum !== window.ethereum) {
    console.log('not metamask detected')
  } else {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const cid = await ethereum.request({
      method: 'net_version',
    })

    const correctChain = cid === CHAINID

    let ac, mc;
    if (signer && correctChain) {
      ac = new Contract(tokenContractAddr, tokenABI, signer)
      mc = new Contract(marketplaceContractAddr, marketplaceABI, signer)
    }
    // const obj = {
    //   provider: provider,
    //   needsOnboard: false,
    //   membershipContract: mc,
    //   correctChain: correctChain,
    // };

    //dispatch(onProvider(obj))

    provider.on('accountsChanged', (accounts) => {
      dispatch(
        accountChanged({
          address: accounts[0],
        })
      )
    })

    provider.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload()
    })
  }
};

export const chainConnect = (_chainId) => async (dispatch) => {
  const WEB3_CONNECT_CACHED_PROVIDER  = localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')
  console.log('=============', WEB3_CONNECT_CACHED_PROVIDER)
  if(WEB3_CONNECT_CACHED_PROVIDER === '"injected"') {
      if (window.ethereum) {
        const cid = ethers.utils.hexValue(BigNumber.from(_chainId))
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: cid }],
          })
        } catch (error) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: ETHEREUM_SETTING.NAME,
                    chainId: cid,
                    rpcUrls: [ETHEREUM_SETTING.RPC_URL],
                    blockExplorerUrls: null,
                    nativeCurrency: {
                      name: ETHEREUM_SETTING.SYMBOL,
                      symbol: ETHEREUM_SETTING.SYMBOL,
                      decimals: 18,
                    },
                  },
                ],
              })
        
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: cid }],
              })
            } catch (addError) {
              console.error(addError)
              window.location.reload()
            }
          }
          console.log(error)
        }
      } else {
        const web3Provider = new WalletConnectProvider({
          rpc: {
            25: 'https://evm.cronos.org',
          },
          chainId: 25,
        })
      }
  } else if(WEB3_CONNECT_CACHED_PROVIDER === '"custom-binancechainwallet"') {
    if(_chainId === ETHEREUM_SETTING.CHAINID){
      
    }
    else if(_chainId === BINANCE_SETTING.CHAINID){

    }
    await BinanceChain.bnbSign({})
    
  }
   
}

