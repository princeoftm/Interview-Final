import { useSelector, useDispatch } from "react-redux";
import { updateBlockchain, chainConnect } from "../../store/actions/user";
import Icon from "../Icon/Icon";

import { ETHEREUM_SETTING, BINANCE_SETTING } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import { errorAlert, warningAlert } from '../toastGroup';

const ChooseBlockchain = ({ headingText, actionText, onCreate }) => {
  const blockchain = useSelector(state => state.user.blockchain)
  const dispatch = useDispatch()

  const signIn = (name) => {
    let chainId
    if(name === 'Ethereum') 
      chainId = ETHEREUM_SETTING.CHAINID
    else if(name === 'Binance')
      chainId = BINANCE_SETTING.CHAINID 
    else if(name === 'Tezos' || 'Flow') {
      return
    }

    const WEB3_CONNECT_CACHED_PROVIDER = localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')
    if(WEB3_CONNECT_CACHED_PROVIDER === '"injected"') {
      dispatch(chainConnect(chainId))
     }
    else if(WEB3_CONNECT_CACHED_PROVIDER === '"custom-binancechainwallet"') { 
      errorAlert('change network')
      dispatch(chainConnect(chainId))
    }

    localStorage.setItem('blockchain', name)
    dispatch(updateBlockchain(name))
  }

  return (
    <div className="my-10">
      <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />
      <h2 className="text-cape-cod text-lg text-center mb-2 font-bold">
        {headingText}
      </h2>
      <p className="text-center text-rolling-stone text-sm">
        Connect with one of our wallet provider or Create a new one
      </p>
      <div className="bg-[#f6f6f6] rounded-md w-full max-w-6xl mx-auto mt-6 p-4">
        <p className=" text-xl font-bold mb-1">Choose Blockchain</p>

        <p className="text-rolling-stone text-sm">{actionText}</p>
        <div className="flex gap-3 mt-4 justify-center flex-wrap">
          <Blockchain
            onCreate={onCreate}
            name={`Ethereum`}
            icon="ethereum"
            iconBackground="#F3F5FF"
            loggedIn={blockchain === 'Ethereum' ? true : false}
            summary="Trade with a decentralized, open-source blockchain with smart contract functionality"
            signIn={signIn}
          />
          <Blockchain
            onCreate={onCreate}
            name={`Binance`}
            icon="binance"
            iconBackground="#fffee9"
            loggedIn={blockchain === 'Binance' ? true : false}
            summary="Trade with a decentralized, open-source blockchain with smart contract functionality"
            signIn={signIn}
          />
          {/* <Blockchain
            onCreate={onCreate}
            name={`Tezos`}
            icon="tezos"
            iconBackground="#e4eeff"
            loggedIn={blockchain === 'Tezos' ? true : false}
            summary="Trade with a decentralized, open-source blockchain with smart contract functionality"
            signIn={signIn}
          />
          <Blockchain
            onCreate={onCreate}
            name={`Flow`}
            icon="flow"
            iconBackground="#eefee9"
            loggedIn={blockchain === 'Flow'}
            summary="Trade with a decentralized, open-source blockchain with smart contract functionality"
            signIn={signIn}
          /> */}
        </div>
      </div>
    </div>
  );
};

const Blockchain = ({
  name,
  icon,
  iconBackground,
  loggedIn,
  summary,
  onCreate,
  signIn
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-md p-4 pt-10 px-9 relative w-64">
      {loggedIn && (
        <div className="w-fit absolute top-2 right-2 text-xs bg-green-100 text-green-600 py-1 px-2 rounded-md">
          Signed in
        </div>
      )}
      <div
        className={`rounded-[50%] p-4 w-24 mx-auto flex justify-center items-center`}
        style={{ backgroundColor: iconBackground }}
      >
        <Icon type={icon} />
      </div>
      <p className="font-bold text-center text-cape-cod text-lg mt-4">{name}</p>
      <p className="text-center text-rolling-stone text-sm mt-3">{summary}</p>
      {loggedIn ? (
        <button
          onClick={onCreate}
          className="bg-orange text-white rounded-md px-6 py-2 text-sm mt-6"
        >
          Create
        </button>
      ) : (
        <button className="border border-[#e7eff0] text-[#9e9e9e] rounded-md px-6 py-2 text-sm mt-4" onClick={() => signIn(name)}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default ChooseBlockchain;
