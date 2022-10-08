import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

import { UserContextProvider } from "../src/context/UserContext";
import Layout from "../src/components/Layout";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

const MyApp = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <UserContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  </Web3ReactProvider>
);

export default MyApp;
