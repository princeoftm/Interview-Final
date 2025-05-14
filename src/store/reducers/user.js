import Web3Modal from 'web3modal';

import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_PROFILE,
  LOAD_ARTISTS,
  LOAD_WEB3MODAL,
  ACCOUNT_CHANGED,
  ON_CORRECT_CHAIN,
  ON_PROVIDER,
  ON_BASIC_ACCOUNT_DATA,
  CONNECTING_WALLET,
  ON_LOGOUT,
  SET_SHOW_WRONG_CHAIN_MODAL,
  UPDATE_BLOCKCHAIN
} from '../actionTypes/user'

const INITIAL_STATE = {
  currentUser: null,
  artists: [],
  web3Modal: [],
  // custom
  provider: null,
  address: null,
  web3modal: null,
  connectingWallet: null,
  code: '',
  isMember: false,
  needsOnboard: false,
  //contracts,
  addressesContract: null,
  marketplaceContract: null,

  correctChain: false,
  showWrongChainModal: false,
  balance: null,
  blockchain: 'Ethereum'
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        currentUser: {
          wallet: action.wallet
        }
      }
    case DISCONNECT_WALLET:
      return {
        ...state,
        currentUser: null
      }
    case UPDATE_PROFILE:
      const { userInfo } = action
      return {
        ...state,
        currentUser: userInfo
      }
    case LOAD_ARTISTS:
      return {
        ...state,
        artists: action.artists
      }
    case LOAD_WEB3MODAL:
        return {
          ...state,
          web3Modal: action.web3Modal
        } 
    case ACCOUNT_CHANGED: 
      return {
        ...state,
        provider: action.payload.provider,
        address: action.payload.address,
        web3modal: action.payload.web3modal,
        code: action.payload.code,
        isMember: action.payload.isMember,
        needsOnboard: action.payload.needsOnboard,
        addressesContract: action.payload.addressesContract,
        marketplaceContract: action.payload.marketplaceContract,
        correctChain: action.payload.correctChain,
        balance: action.payload.balance
      }
    case ON_CORRECT_CHAIN:
        return {
          ...state,
          correctChain: action.correctChain
        } 
    case ON_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
        needsOnboard: action.payload.needsOnboard,
        correctChain: action.payload.correctChain,
      }
    case ON_BASIC_ACCOUNT_DATA:
      return {
          ...state,
          address: action.payload.address,
          provider: action.payload.provider,
          web3modal: action.payload.web3modal,
          correctChain: action.payload.correctChain,
          needsOnboard: action.payload.needsOnboard
      }
    case CONNECTING_WALLET:
      return {
        ...state,
        connectingWallet: action.wallet
      }

    case SET_SHOW_WRONG_CHAIN_MODAL:
      return {
        ...state,
        showWrongChainModal: action.status
      }  
    case ON_LOGOUT:
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions: [], // required
      });
      web3Modal.clearCachedProvider();
      if (state.web3modal != null) {
        state.web3modal.clearCachedProvider();
      }
      localStorage.clear()
      return state
    case UPDATE_BLOCKCHAIN:
      return {
        ...state,
        blockchain: action.blockchain
      }
      
      return {
        ...state,
        connectingWallet: false, 
        web3modal: null,
        provider: null,
        address: '',
        balance: null,
        isMember: false
      }                
    default:
      return state
  }
}

export default reducer


