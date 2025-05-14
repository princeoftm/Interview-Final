import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from "react-dom";
import Arweave from "arweave";
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { SolanaPrivateKeyProvider, SolanaWallet } from '@web3auth/solana-provider';
import { MetaMaskInpageProvider } from "@metamask/providers";

import type { IProvider } from "@web3auth/base";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import { ADAPTER_EVENTS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { clientId, chainConfig, app } from "./pages/config/config.js";
import { Outlet, Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import User from "./pages/user";
import Payment from "./pages/payments";
import Checkout from "./pages/checkout";
import Blogs from "./pages/Addproduct";
import Cart from "./pages/Cart";
import { CartProvider } from "./pages/CartContext";

import "./App.css";
declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}
function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Add a product here</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
    </nav>
  );
}

// Solana Web3Auth Setup (background only)
const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const verifier = "authenticator";

async function mintNFt() {
  const provider = web3auth.provider;
  const solanaWallet = new SolanaWallet(provider!);
  const accounts = await solanaWallet.requestAccounts();
  const connectionConfig: any = await solanaWallet.request({
    method: "solana_provider_config",
    params: [],
  });

  const connection = new Connection(connectionConfig.rpcTarget);
  const balance = await connection.getBalance(new PublicKey(accounts[0]));
  if (balance === 0) throw new Error("Insufficient balance");

  console.log("Minting NFT...");
  const pubKey = await solanaWallet.requestAccounts();
  const { blockhash } = await connection.getLatestBlockhash("finalized");

  const TransactionInstruction = SystemProgram.transfer({
    fromPubkey: new PublicKey(pubKey[0]),
    toPubkey: new PublicKey(pubKey[0]),
    lamports: 0.01 * LAMPORTS_PER_SOL,
  });

  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: new PublicKey(pubKey[0]),
  }).add(TransactionInstruction);

  const signedTx = await solanaWallet.signTransaction(transaction);
  console.log(signedTx);
}

function App() {
const [provider, setProvider] = useState< IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  };

  const login = async () => {
    if (!web3auth) return;
    const loginRes = await signInWithGoogle();
    const idToken = await loginRes.user.getIdToken(true);
    const { payload } = decodeToken(idToken);

    const web3authProvider = await web3auth.connect({
      verifier,
      verifierId: (payload as any).sub,
      idToken,
    });

    if (web3authProvider) {
      setLoggedIn(true);
      setProvider(web3authProvider);
    }

    await getBalance();
    await getAccounts();
  };

  const getAccounts = async () => {
    const publicKey = await web3auth?.provider?.request({ method: 'solanaPublicKey' });
    setAddress(String(publicKey));
    localStorage.setItem("address", "0x" + String(publicKey));
  };

  const getBalance = async () => {
    if (!provider) return;
    const solanaWallet = new SolanaWallet(provider);
    const accounts = await solanaWallet.requestAccounts();
    const connectionConfig: any = await solanaWallet.request({
      method: 'solana_provider_config',
      params: [],
    });
    const connection = new Connection(connectionConfig.rpcTarget);
    const balance = await connection.getBalance(new PublicKey(accounts[0]));
    setBalance(balance / LAMPORTS_PER_SOL);
    localStorage.setItem("balance", String(balance));
  };

  const getAirdrop = async () => {
    if (!provider) return;
    const solanaWallet = new SolanaWallet(provider);
    const accounts = await solanaWallet.requestAccounts();
    const connectionConfig: any = await solanaWallet.request({
      method: 'solana_provider_config',
      params: [],
    });
    const connection = new Connection(connectionConfig.rpcTarget);
    try {
      const signature = await connection.requestAirdrop(
        new PublicKey(accounts[0]),
        1 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature);
    } catch (error) {
      console.error("Airdrop failed", error);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];

if (accounts && accounts.length > 0) {
  setEthAddress(accounts[0]);
  localStorage.setItem("ethAddress", accounts[0]);
} else {
  throw new Error("No accounts returned from MetaMask.");
}

      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    setEthAddress("");
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <BrowserRouter>
          <Navbar />
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
              </Route>
            </Routes>
          </CartProvider>
        </BrowserRouter>

        <div className="sidebar">
          {!ethAddress ? (
            <button onClick={connectMetaMask} className="sidebar-item">
              Connect to MetaMask
            </button>
          ) : (
            <div className="sidebar-item">Connected: {ethAddress}</div>
          )}
          <button onClick={logout} className="sidebar-item">Log Out</button>

        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <div>
      <button onClick={login} className="card" id="login-btn">
        Login
      </button>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" rel="noreferrer">
          NFT MarketPlace 
        </a>{" "}
      </h1>
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export { web3auth, mintNFt };
export default App;
