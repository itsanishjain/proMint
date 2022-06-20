import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import toast, { Toaster } from 'react-hot-toast';
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";

import Form from "../src/components/Form";

import { NFT_CONTRACT_RINKEBY_ADDRESS, NFT_CONTRACT_BINANCE_ADDRESS, NFT_CONTRACT_POLYGON_ADDRESS, NFT_CONTRACT_ABI } from "../src/constants";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("0");

  const [metadataURLIPFS, setMetadataURLIPFS] = useState("");

  const [nftUrl, setNftUrl] = useState(false);
  const [CHAIN_ID, SET_CHAINID] = useState()

  const [NFT_CONTRACT_ADDRESS, SET_NFT_CONTRACT_ADDRESS] = useState()

  const [dropOption, setDropOption] = useState('Select Network');

  const web3ModalRef = useRef();

  const publicMint = async () => {
    if (CHAIN_ID !== 4 && CHAIN_ID !== 97 && CHAIN_ID !== 80001) {
      toast.error("Change the network to Rinkeby OR Binance OR Mumbai")
      return
    }
    if (metadataURLIPFS !== "") {
      try {
        const signer = await getProviderOrSigner(true);

        const NFTeeContract = new Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          signer
        );

        const tx = await NFTeeContract.mintNFT(metadataURLIPFS);
        setTxHash(tx.hash)

        setLoading(true);
        await tx.wait();

        setLoading(false);
        setNftUrl(true);
        toast.success("You successfully minted a Masterpiece!");
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Please upload an image");
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };



  const switchToRinkeby = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }]
    });
    console.log("HERE IS RINKEBY")
  }

  const switchToBinance = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }]
    });
  }

  const switchToMumbai = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }]
    });
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    SET_CHAINID(chainId);


    if (chainId == 4) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_RINKEBY_ADDRESS)
      setDropOption('Rinkeby')
    }
    if (chainId == 97) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_BINANCE_ADDRESS)
      setDropOption('Binance')
    }
    if (chainId == 80001) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_POLYGON_ADDRESS)
      setDropOption('Mumbai')
    }


    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();

    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected)
      return <Button text={"Connect your wallet"} onClick={connectWallet} />;
    if (loading) return (
      <div className="flex justify-center items-center py-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
      </div>
    );
    else {
      return <Button onClick={publicMint} text="Mint 🚀" />;
    }
  };

  return (
    <div className="m-2">
      <Head>
        <title>Create NFTS</title>
        <meta name="description" content="Create your moments as NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <p className="p-3 text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
        Mint NFTs on Ethereum, Binance, and Polygon with just one click</p>

      <img src="/banner.png" />

      {nftUrl && (

        <div className="text-center text-white m-4">
          {
            CHAIN_ID === 4 || CHAIN_ID === 80001 ? (
              <a
                className="text-lg font-medium  text-white cursor-pointer underline"
                href={`https://testnets.opensea.io/assets/${CHAIN_ID == 4 ? 'rinkeby' : 'mumbai'}/${NFT_CONTRACT_ADDRESS}/${1}`}
              >
                Here is your NFT ➡️
              </a>
            ) :
              <a
                className="text-lg font-medium  text-white cursor-pointer underline"
                href={`https://testnet.bscscan.com/tx/${txHash}`}
              >
                Here is your NFT ➡️
              </a>
          }

        </div>
      )}



      <Form setMetadataURLIPFS={setMetadataURLIPFS} />

      <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium ">

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {dropOption}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        await switchToRinkeby()
                        setDropOption('Rinkeby')
                        getProviderOrSigner()
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Rinkeby
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        await switchToBinance()
                        setDropOption('Binance')
                        getProviderOrSigner()
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Binance
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        await switchToMumbai()
                        setDropOption('Mumbai')
                        getProviderOrSigner()
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Mumbai
                    </button>
                  )}
                </Menu.Item>

              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {renderButton()}


      </div>
    </div>
  );
}
