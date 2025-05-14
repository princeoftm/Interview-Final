import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { connectAccount } from "../store/actions/user"
import { ETHEREUM_SETTING, BINANCE_SETTING } from "../constants"
import marketplaceABI from "../constants/abi/marketplace"
import { Contract, ethers, BigNumber } from 'ethers';

import ChooseBlockchain from "../components/ChooseBlockchain/ChooseBlockchain"
import Icon from "../components/Icon/Icon"
import Image from "next/image"

let marketplaceContractAddr

export default function PayForItem() {
  const [showListingModal, setShowListingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [listingProgress, setListingProgress] = useState(1);
  const [amountEth, setAmountEth] = useState(0)
  const { query } = useRouter()
  const dispatch = useDispatch()

  const walletAddress = useSelector((state) => {
    return state.user.address
  })

  const provider = useSelector((state) => {
    return state.user.provider
  })

  const blockchain = useSelector((state) => {
    return state.user.blockchain
  })

  const startListingPayment = async () => {
    setShowListingModal(true)
    if (walletAddress !== '' && walletAddress !== null) {
      setListingProgress(3)
      const { tokenId, p, q } = query
      setAmountEth(p * q)

      //*************** CREATE SALE(sale listing) *******************/
      let signer = provider.getSigner()

      if (blockchain === 'Ethereum')
        marketplaceContractAddr = ETHEREUM_SETTING.marketplaceContractAddr
      else if (blockchain === 'Binance')
        marketplaceContractAddr = BINANCE_SETTING.marketplaceContractAddr

      const marketContract = new ethers.Contract(marketplaceContractAddr, marketplaceABI, signer)
      const price = (p * 1000000000000000000).toString()
      const amount = q
      await marketContract.createSale(tokenId, price, amount)
      setListingProgress(4)
    }
    else {
      dispatch(connectAccount())
      return
    }
  }

  const confirmListing = () => {
    setShowListingModal(false);
    setShowSuccessModal(true);
  };

  return (
    <>
      <ChooseBlockchain
        headingText={"You need an Ethereum Wallet with sufficient gas fee for listing"}
        actionText={"Choose suitable blockchain and sign in to list an NFT"}
        onCreate={() => {
          startListingPayment()
        }}
      />
      {showListingModal && (
        <CompleteListingModal
          onContinue={confirmListing}
          close={() => setShowListingModal(false)}
          progress={listingProgress}
          amountEth={amountEth}
        />
      )}
      {showShareModal && <ShareModal />}
      {showSuccessModal && (
        <SuccessModal
          onShare={() => {
            setShowSuccessModal(false);
            setShowShareModal(true);
          }}
        />
      )}
    </>
  );
}

const CompleteListingModal = ({
  amountEth = { amountEth },
  progress = 1, //progress : [1, 2, 3, 4]; 4 = complete
  close,
  onContinue,
}) => {
  const stageIcon = (stage) => {
    if (stage === progress) {
      return <Icon type={"listingLoading"} />
    }
    else if (stage < progress)
      return <Icon type={"check-round"} color="#80D783" opacity="1" />;
    return <Icon type={"check-round"} />;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center p-4 relative">
        <button onClick={close} className="absolute top-2 right-2">
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
        <h4 className="text-cape-cod font-medium mb-4">
          Complete your Listing
        </h4>

        <p className="text-shuttle-gray mt-5 mb-11">
          Listing your NFT would require small token for gas fee, so you have to
          deposit additional funds to complete listing.
        </p>
        <div className="flex gap-3 text-left mb-8">
          <div>{stageIcon(1)}</div>

          <div>
            <p className="text-shuttle-gray font-bold">Initializing Wallet</p>
            <p className="text-pale-sky text-sm">
              To get set Up for NFT listing, you must initialize your wallet
              which requirea a one-time gas fee.
            </p>
          </div>
        </div>
        <div className="flex gap-3 text-left mb-8">
          {stageIcon(2)}
          <div>
            <p className="text-shuttle-gray font-bold">
              Approve item for Listing
            </p>
            <p className="text-pale-sky text-sm">Approving item for Listing</p>
          </div>
        </div>
        <div className="flex gap-3 text-left pb-8 border-b border-b-[#ccc]">
          {stageIcon(3)}
          <div>
            <p className="text-shuttle-gray font-bold">
              Confirm {amountEth} ETH Listing
            </p>
            <p className="text-pale-sky text-sm">
              Confirming NFT listing amount
            </p>
          </div>
        </div>

        <button
          className={`${progress < 4 ? `bg-silver` : `bg-orange`
            } text-white mx-auto px-6 py-2 rounded-md mt-5`}
          disabled={progress < 4}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const SuccessModal = ({ onShare }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center p-4 relative">
        <button className="absolute top-2 right-2">
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
        <div className="flex justify-center mb-4 mt-3">
          <Icon type={"success-green"} width={100} height={100} />
        </div>

        <h4 className="text-cape-cod text-xl font-medium mb-4">
          NFT Successfully Listed
        </h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={onShare}
            className="bg-white text-orange border border-orange mx-auto px-6 py-2 rounded-md mt-5 w-56"
          >
            Done
          </button>
          <button
            onClick={onShare}
            className="bg-orange text-white mx-auto px-6 py-2 rounded-md mt-5 w-56"
          >
            Share Forum Link
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden  p-4 relative">
        <button className="absolute top-2 right-2">
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
        <h4 className="text-cape-cod text-xl font-medium mb-4 text-center">
          Share Link
        </h4>
        <form className="flex flex-col mt-4 border-b border-b-[#ccc] pb-4">
          <input
            type={"text"}
            className="border border-[#E7E7F0] p-2 rounded-md w-full"
            placeholder="Type something here"
          />
          <button className="bg-orange text-white px-6 py-2 rounded-md mt-5 w-56">
            Send Link
          </button>
        </form>
        <p className="text-shuttle-gray font-bold mt-3">Forum Link</p>
        <p>https://forums.yyyyy.com/i/u838883</p>
        <button className="text-sm text-orange flex items-center gap-1">
          <Image
            width="16"
            height="16"
            alt="copy"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFI0lEQVRogdWaW2wUVRjHf+fMbgulNUgBubXQ0kqxQikWWhOJQqLxRRQhVkWMPgBqoiUGoiYmxsREFImPiCUxsYpWRIxvxARiEAVdLm0tFLm02EpEaUG6Bdud2c+H7ZYWuztnZ7cu/J52Zr7L/9u5nfOdUaQAaW2ehHKWIFKJViUIhUAukN1vEgQ6UZwhLC3AAfDtVQWlfySbW3kW3XE8F8deicgqoMJbEH5Gqzos33Y1bXanlxAJFyAdDdMI6fUoWQ1keUk6DD0oatHh91TevN8TcTQuQAIBPxP8LyDqLa5dGqnmCiKbsLPeVsXFvSYORgXImYZZaFUPlCUlzxg5iiPVaua8X90stWuotoblaBXgfxMPoOZh6YC0NS1zs4xbgLQ2PgPqc0bukolHDsgOaW16Lp5RzAKktXEtio8AX8qlmWOhZIucbXoxlsGw94C0NSwHVQ9YppnkahDpOgeOnaBEH2rcFNTouCfZQVihCuZ+ff2B/xQg7c1FOM4h4BaT/NLzN6EvNuIc2p24+CiWD6viQfyPvYrKipk2iLBAFcxtGbxzSAHS3JzBGOcnTG/YUC+9764i3NHibmuAzishc0Md+DNjmRzhQl+lqqgIDfgMOZzlvEwCTxt735cpEw8Qbm/B/n5nPJNyxmfWDN4xUIC0H52K4nWjTKHIOybcvC9xlS6Ef3GLKW9I27HJ0a1rZ8C2NgBj3BLYez4ltOv9SKjgJW8q48kLXnQzyQZ7fXRDQ//ALDK2iYtz+FtCO94Buy85lcmzVjqO50L0DDj2SgwGZs4Pu0ZWljljsEOPQ7SAyJDYFenuGkFNCaLU0wC6/4a4K81yEkdkgZxpuk2DvZgkJjZpRKG4TyNSmW4lntFSpdGqJN06PCPM0ghF6daRBMUaGJtuFd5RYzXpmaykCMlxnVLe6GgiTaebFNWtAdfR042LXNIoTqdbRhKc1P29ypsTxQkNHEi3Du+oHzWi9wCSbikeEBy+06pwznmEgJGL7n/qhsMAqOzUvwNVzjhT04OqcM75iCKt6oyCZ98KgFyOdMJ16aKEBbqh7zSNKXUQndBYvu1Aj5uLmloMgHPyEPRexbdoBTp/tjelw6Dz78B3z3IT0x58GfXQX4CaNrsTRa2blzX/gciPf4KEdm8DfyYZNbVYlQ+BlUQH0vJjVS0lY10t+DIMHOSD6ILIwERG2o9OxdEncOlM9G2pwWncC0rjr34N373VA0WFO721FnXuFBhlPCTrRqzbo8tTQztzZxtfQdgYz1u6u+jd+GSkDwroonKsqofRkwriddRiokZloybmJ+KxXs2Ys3lga4i4QMDP+IyDQHm8ENJ1jr4tNYQ7TiSmdhgyVm/Gmn+/qflhLvRVDW4tem/uOjb2/q9w9u8k/NvxRDRHyByNf+lL+JasNPUIEpYKVVg25F+L0V5vWgayA8P2ulwNIhfPg220rAXaQo/Pg1HGa4QOWh5V+WXfXH8gZjdCzjauQdhqmmEEEZA1akbZtuEOxpzQqOlzP0R4FvDY9E8JDsLzscSDQT9IWhsfQfExkJNSae5cRsuq4S6bwZgts54+Uoxl1ePydEohh7GsapVXesrN0GhOrGaWn2R650KUrAO6k5YXmyuIvEmPdbeJePDyqUHbsclgbwDWYLCeYEgPsBWxNiX6AUhyH3vYoSeAp4CFHmIJcBD4BMv6TOWVemp9p6SpK6caJmLpxWipQigBCoAJDP3c5i+gFUULYXUAJ7xXFZX9mWzufwG5GLMEyTAbGAAAAABJRU5ErkJggg=="
          />
          <span>Copy Link</span>
        </button>

        <p className="text-shuttle-gray mt-4">
          Restricted only to people added on the link
        </p>
        <button className="text-sm text-orange">
          Change to anyone with the link
        </button>
      </div>
    </div>
  );
};
