import { useState, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { connectAccount } from "../../store/actions/user";

import Image from "next/image";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Link from 'next/link'


function NavLink({ to, children }) {
  return (
    <Link href={to}>
      <a className={`text-lg	mx-4`}>
        {children}
      </a>
    </Link>
  );
}

function MobileHeader({ open, setOpen, walletAddress, walletConnect }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex flex-col ml-4 mr-4 pt-16">
        <Link href="/">
          <a
            className="my-4 text-xl font-normal"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Explore
          </a>
        </Link>
        <Link href="/">
          <a
            className="my-4 text-xl font-normal"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Stats
          </a>
        </Link>
        <Link href="/own-list">
          <a
            className="my-4 text-xl font-normal"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            My Digital Assets
          </a>
        </Link>
        <Link href='/create-item'>
          <a
            className="my-4 text-xl font-normal"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Create NFT
          </a>
        </Link>
        <Button
          type="button"
          className="rounded-md py-2.5 px-9 text-lg border border-solid border-orange text-orange"
          onClick={() => walletConnect()}
        >
          <span>{walletAddress !== '' && walletAddress !== null ? walletAddress.substr(0, 6) + '...' + walletAddress.substr(walletAddress.length - 4, 4) : 'Connect Wallet'}</span>
        </Button>
      </div>
    </div>
  );
}

export default function Header() {
  const blockchain = useSelector(state => state.user.blockchain)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const walletAddress = useSelector(state => state.user.address)
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  const walletConnect = async () => {
    if (walletAddress !== '' && walletAddress !== null)
      return
    dispatch(connectAccount(false))
  }

  return (
    <Fragment>
      <nav className={`flex items-center px-3 md:px-8 bg-white shadow-lg py-3 md:py-9 filter drop-shadow-md ${isMobileSearch ? 'justify-between' : ''}`}>
        {
          isMobileSearch ?
            <>
              <Search />
              <button className="mr-2 h-8 w-8 flex flex-col items-center justify-between" onClick={() => setIsMobileSearch(false)}>
                <span className="h-1 w-full bg-black rounded-lg rotate-45 translate-y-3.5" />
                <span className="h-1 w-0" />
                <span className="h-1 w-full bg-black rounded-lg -rotate-45 -translate-y-3.5" />
              </button>
            </>
            :
            <>
              <MobileHeader open={open} setOpen={setOpen} walletAddress={walletAddress} walletConnect={walletConnect} />

              <div className="flex items-center justify-between w-full md:w-1/2">
                <div className="items-center flex">
                  <Link href="/">
                    <a
                      className="flex items-center text-lg md:text-2xl font-semibold"
                    >
                      <Image src="/assets/logo.svg" alt="logo" width={48} height={40} />
                      <div className="pl-3 z-50">PayByMint</div>
                    </a>
                  </Link>

                </div>
                <div className="flex items-center justify-around">
                  <button className="p-1 focus:outline-none focus:shadow-outline text-opacity-40 md:hidden mr-3" onClick={() => setIsMobileSearch(true)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4232 12.4278C13.5827 11.2694 14.3 9.66847 14.3 7.9C14.3 4.36538 11.4346 1.5 7.9 1.5C4.36538 1.5 1.5 4.36538 1.5 7.9C1.5 11.4346 4.36538 14.3 7.9 14.3C9.66616 14.3 11.2652 13.5846 12.4232 12.4278ZM12.4232 12.4278L16.4333 16.4379"
                        stroke="currentColor"
                        strokeWidth="1.56667"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                  <button
                    className="relative z-50 flex flex-col items-center justify-between w-7 h-5 md:hidden"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    {/* hamburger button */}
                    <span
                      className={`h-[3px] w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-[8px]" : ""
                        }`}
                    />
                    <span
                      className={`h-[3px] w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"
                        }`}
                    />
                    <span
                      className={`h-[3px] w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-[8px]" : ""
                        }`}
                    />
                  </button>

                  <div className="hidden md:flex">
                    <NavLink to="/">Explore</NavLink>
                    <NavLink to="/">Stats</NavLink>
                    <NavLink to="/create-item">Create NFT</NavLink>
                    {
                      walletAddress !== null && walletAddress !== '' &&
                      <NavLink to="/own-list">My Digital Assets</NavLink>
                    }
                  </div>
                </div>
              </div>
              <div className="items-center justify-between hidden w-1/2 px-6 md:flex">
                <Search />
                {/* <Button
              type="button"
              className="rounded-md py-2.5 px-9 text-lg border border-solid border-orange text-orange"
            >
              <Link href="/pay-for-item">
                <a className="mr-6 text-pink-500">
                  Log in
                </a>
              </Link>
            </Button> */}
                <button className="btn-chain">
                  {blockchain === 'Ethereum' && <img src="assets/icons/ethereum.svg" alt="" />}
                  {blockchain === 'Binance' && <img src="assets/icons/bsc.svg" alt="" />}
                  {blockchain === 'Tezos' && <img src="assets/icons/tezos.png" style={{ width: "28px", height: "28px" }} alt="" />}
                  {blockchain === 'Flow' && <img src="assets/icons/flow.png" alt="" />}
                  <span> <Link href="/pay-for-item"><a>{blockchain}</a></Link></span>
                </button>
                <Button
                  type="button"
                  className="rounded-md py-2.5 px-9 text-lg border border-solid border-orange text-orange"
                  onClick={() => walletConnect()}
                >
                  <span>{walletAddress !== '' && walletAddress !== null ? walletAddress.substr(0, 6) + '...' + walletAddress.substr(walletAddress.length - 4, 4) : 'Connect Wallet'}</span>
                </Button>
              </div>
            </>
        }
      </nav>
    </Fragment>
  );
}
