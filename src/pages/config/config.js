import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";

const clientId = "BKtu5x05Fhgwz4v5c_4f9BzrqO91VSu4zHrGJtycdeAKKTfSTYJGdchI2v5V9PFl5miqR-mXsU8HzNg00CeVsX4"; 

const firebaseConfig = {
    apiKey: "AIzaSyApSz11Fy1G1-RKHSrLdQ_OP68TrZr5Z5U",
    authDomain: "kissan-connect-33f10.firebaseapp.com",
    databaseURL:"https://kissan-connect-33f10-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "kissan-connect-33f10",
    storageBucket: "kissan-connect-33f10.appspot.com",
    messagingSenderId: "745440975310",
    appId: "1:745440975310:android:016d39b3dfa765d69af39f",
};

  
const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x1",
    rpcTarget: "https://api.devnet.solana.com",
    displayName: "Solana Mainnet",
    blockExplorerUrl: "https://explorer.solana.com/",
    ticker: "SOL",
    tickerName: "Solana",
  };
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = getFirestore();
const storage = firebase.storage().ref();

export { chainConfig,clientId,app,auth, db, storage }