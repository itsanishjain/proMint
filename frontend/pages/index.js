import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import toast, { Toaster } from 'react-hot-toast';
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";

import Form from "../src/components/Form";

import { NFT_CONTRACT_RINKEBY_ADDRESS, NFT_CONTRACT_BINANCE_ADDRESS, NFT_CONTRACT_POLYGON_ADDRESS, NFT_CONTRACT_ABI } from "../src/constants";


export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const [metadataURLIPFS, setMetadataURLIPFS] = useState("");

  const [nftUrl, setNftUrl] = useState(false);
  const [CHAIN_ID, SET_CHAINID] = useState()

  const [NFT_CONTRACT_ADDRESS, SET_NFT_CONTRACT_ADDRESS] = useState()

  const web3ModalRef = useRef();

  const publicMint = async () => {
    if (metadataURLIPFS !== "") {
      try {
        const signer = await getProviderOrSigner(true);

        const NFTeeContract = new Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          signer
        );

        const tx = await NFTeeContract.mintNFT(metadataURLIPFS);

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

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        provider
      );
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    SET_CHAINID(chainId);
    if (chainId !== 4 && chainId !== 97 && chainId !== 80001) {
      toast.error("Change the network to Rinkeby OR Binance OR Mumbai")
      throw new Error("Change network to Rinkeby");
    }

    if (chainId == 4) SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_RINKEBY_ADDRESS)
    if (chainId == 97) SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_BINANCE_ADDRESS)
    if (chainId == 80001) SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_POLYGON_ADDRESS)


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
          <a
            className="text-lg font-medium  text-white cursor-pointer underline"
            href={`https://testnets.opensea.io/assets/${CHAIN_ID == 4 ? 'rinkeby' : 'mumbai'}/${NFT_CONTRACT_ADDRESS}/${1}`}
          >
            Here is your NFT ➡️
          </a>
        </div>
      )}



      <Form setMetadataURLIPFS={setMetadataURLIPFS} />

      <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium ">
        {renderButton()}
      </div>
    </div>
  );
}
