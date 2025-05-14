import ChooseBlockchain from "../components/ChooseBlockchain/ChooseBlockchain";

export default function PayForItem() {
  // const signedIn = useSelector(state => state.user.blockchain)
  // const dispatch = useDispatch()

  // const signIn = (name) => {
  //   localStorage.setItem('blockchain', name)
  //   dispatch(updateBlockchain(name))
  // }


  // console.log('signedIn', signedIn)

  return (
    <ChooseBlockchain
      headingText={"You need an Ethereum Wallet to pay for the item bought"}
      actionText={"Choose suitable blockchain and sign in to create an NFT"}
    />
  );
}
