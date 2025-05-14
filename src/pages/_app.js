import { useDispatch } from "react-redux";
import { _appInitializer } from "../store/actions/init";
import { useEffect } from 'react'

import { wrapper, store } from '../store/store'
import { Provider } from 'react-redux'
import { updateBlockchain } from "../store/actions/user";

import "swiper/css";

import '../styles/globals.css'
import Header from '../components/Header/Header'
import Footer from "../components/Footer/Footer";
import Head from "next/head";

function Poulina({ Component, pageProps }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(_appInitializer())

    const blockchain = localStorage.getItem('blockchain')
    if (blockchain)
      dispatch(updateBlockchain(blockchain))
  }, [dispatch])

  return (
    <div>
      <Head>
        <title>PayByMint - Powering Modern Payment Through NFT</title>
        <link
          rel="shortcut icon"
          href="/assets/logo.svg"
          type="image/x-icon"
        />
      </Head>
      <Header />
      <nav className="p-6 border-b">
        <p className="text-xl md:text-4xl font-bold">Powering Modern Payment Through NFT</p>
      </nav>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

      <Footer />
    </div>
  )
}

export default wrapper.withRedux(Poulina)