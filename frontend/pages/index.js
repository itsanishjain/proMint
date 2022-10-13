import { Contract, providers } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../src/components/Button";

import { truncateAddress } from "../src/utils/helpers";
import Form from "../src/components/Form";

import { UserContext } from "../src/context/UserContext";

import WalletModal from "../src/components/WalletModal";

import {
  NFT_CONTRACT_RINKEBY_ADDRESS,
  NFT_CONTRACT_BINANCE_ADDRESS,
  NFT_CONTRACT_POLYGON_ADDRESS,
  NFT_CONTRACT_ABI,
} from "../src/constants";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    account,
    activate,
    disconnect,
    chainId: CHAIN_ID,
    library,
    NFT_CONTRACT_ADDRESS,
    dropOption,
    getContractAddress,
    UD,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("0");

  const [metadataURLIPFS, setMetadataURLIPFS] = useState("");

  const [nftUrl, setNftUrl] = useState(false);

  const publicMint = async () => {
    if (CHAIN_ID !== 4 && CHAIN_ID !== 97 && CHAIN_ID !== 80001) {
      toast.error("Change the network to Rinkeby OR Binance OR Mumbai");
      return;
    }
    if (metadataURLIPFS !== "") {
      try {
        if (library.connection.url !== "metamask") {
          library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
        }
        const provider = await library.provider;
        const web3Provider = new providers.Web3Provider(provider);

        const signer = web3Provider.getSigner();

        const NFTeeContract = new Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          signer
        );

        const tx = await NFTeeContract.mintNFT(metadataURLIPFS);
        setTxHash(tx.hash);

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

  const switchToRinkeby = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }],
    });
    console.log("HERE IS RINKEBY");
  };

  const switchToBinance = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  };

  const switchToMumbai = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  };

  const renderButton = () => {
    if (!account)
      return (
        <Button
          text={"Connect your wallet"}
          onClick={() => setIsModalOpen(true)}
        />
      );
    if (loading)
      return (
        <div className="flex justify-center items-center py-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
        </div>
      );
    else {
      return (
        <>
          <Button onClick={publicMint} text="Mint 🚀" />
          <Button
            text={UD ? UD : truncateAddress(account)}
            onClick={disconnect}
          ></Button>
        </>
      );
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

      <div className="p-2 text-center">
        {isModalOpen && <WalletModal setIsModalOpen={setIsModalOpen} />}
      </div>

      <p className="p-3 text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600">
        Mint NFTs on Ethereum, Binance, and Polygon with just one click
      </p>

      <img src="/banner.png" />

      {nftUrl && (
        <div className="text-center text-white m-4">
          {CHAIN_ID === 4 || CHAIN_ID === 80001 ? (
            <a
              className="text-lg font-medium  text-white cursor-pointer underline"
              href={`https://testnets.opensea.io/assets/${
                CHAIN_ID == 4 ? "rinkeby" : "mumbai"
              }/${NFT_CONTRACT_ADDRESS}/${1}`}
            >
              Here is your NFT ➡️
            </a>
          ) : (
            <a
              className="text-lg font-medium  text-white cursor-pointer underline"
              href={`https://testnet.bscscan.com/tx/${txHash}`}
            >
              Here is your NFT ➡️
            </a>
          )}
        </div>
      )}

      <Form setMetadataURLIPFS={setMetadataURLIPFS} />

      <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium ">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {dropOption}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
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
                        await switchToRinkeby();
                        getContractAddress();
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
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
                        await switchToBinance();
                        getContractAddress();
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
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
                        await switchToMumbai();
                        getContractAddress();
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full text-left px-4 py-2 text-sm"
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
