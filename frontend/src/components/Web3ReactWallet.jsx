import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { connectors } from "../utils/connectors";
import { truncateAddress } from "../utils/helpers";

import metamask from "../../public/metaMask.svg";
import walletConnect from "../../public/walletConnect.svg";
import unstoppable from "../../public/unstoppable.png";

import { UserContext } from "../context/UserContext";

const Web3ReactWallet = ({ setIsModalOpen }) => {
  const { account, activate, disconnect, getContractAddress, UD, getUD } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const connectWallet = async (walletName) => {
    setLoading(true);
    let isCancelled = false;

    await activate(connectors[walletName], (err) => {
      toast.error("Connection Rejected");
      console.log(err);
      isCancelled = true;
    }).then(() => {
      if (walletName === "uauth") getUD();
    });
    if (isCancelled) return;

    console.log(walletName);
    localStorage.setItem("provider", walletName);
    getContractAddress();
    toast.success("Connected Successfully");
    setLoading(false);
  };

  return (
    <div className="">
      {!account ? (
        <div className="flex flex-col space-y-4 w-full space-y-4 ">
          <button
            className="text-black border-2 border-black p-4 grid grid-cols-12 items-center"
            onClick={() => connectWallet("injected")}
          >
            <div className="col-span-2">
              <Image src={metamask} alt="metaMask" width={40} height={40} />
            </div>
            <div className="col-span-10">
              <span className="text-md sm:text-xl">MetaMask</span>
            </div>
          </button>
          <button
            className="text-black border-2 border-black p-4 grid grid-cols-12 items-center"
            onClick={() => connectWallet("walletConnect")}
          >
            <div className="col-span-2">
              <Image
                src={walletConnect}
                alt="metaMask"
                width={40}
                height={40}
              />
            </div>
            <div className="col-span-10">
              <span className="text-md sm:text-xl">WalletConnect</span>
            </div>
          </button>
          <button
            className="text-black border-2 border-black p-4 grid grid-cols-12 items-center"
            onClick={() => connectWallet("uauth")}
          >
            <div className="col-span-2">
              <Image src={unstoppable} alt="metaMask" width={40} height={40} />
            </div>
            <div className="col-span-10">
              <span className="text-md sm:text-xl">Unstoppable</span>
            </div>
          </button>
        </div>
      ) : (
        <>
          <p>{UD ? UD : truncateAddress(account)}</p>
          <button
            className="text-black border-2 border-black p-4"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default Web3ReactWallet;
