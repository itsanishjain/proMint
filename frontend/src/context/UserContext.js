import { useWeb3React } from "@web3-react/core";
import { createContext, useState, useEffect, useCallback } from "react";

import { connectors, uauth } from "../utils/connectors";

import Loader from "../components/Loader";

import {
  NFT_CONTRACT_RINKEBY_ADDRESS,
  NFT_CONTRACT_BINANCE_ADDRESS,
  NFT_CONTRACT_POLYGON_ADDRESS,
} from "../constants";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [UD, setUD] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [NFT_CONTRACT_ADDRESS, SET_NFT_CONTRACT_ADDRESS] = useState();
  const [dropOption, setDropOption] = useState("Select Network");

  const getContractAddress = useCallback(() => {
    if (chainId == 4) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_RINKEBY_ADDRESS);
      setDropOption("Rinkeby");
    }
    if (chainId == 97) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_BINANCE_ADDRESS);
      setDropOption("Binance");
    }
    if (chainId == 80001) {
      SET_NFT_CONTRACT_ADDRESS(NFT_CONTRACT_POLYGON_ADDRESS);
      setDropOption("Mumbai");
    }
  }, []);

  const disconnect = () => {
    localStorage.removeItem("provider");
    setUD();
    deactivate();
  };

  const getUD = () => {
    uauth.uauth
      .user()
      .then((res) => {
        setUD(res.sub);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const walletName = localStorage.getItem("provider");
    activate(connectors[walletName]).then(() => {
      if (walletName == "uauth") {
        getUD();
      }
      setIsLoading(false);
      getContractAddress(chainId);
    });
  }, [activate, chainId, getContractAddress]);

  return (
    <UserContext.Provider
      value={{
        account,
        chainId,
        library,
        activate,
        disconnect,
        deactivate,
        isLoggedIn: !!account,
        NFT_CONTRACT_ADDRESS,
        dropOption,
        getContractAddress,
        UD,
        setUD,
        getUD,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
