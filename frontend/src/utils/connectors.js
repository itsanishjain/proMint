import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { UAuthConnector } from "@uauth/web3-react";

import {
  ALCHEMY_POLYGON_MAINNET_URL,
  ALCHEMY_POLYGON_MUMBAI_URL,
} from "./consts";

const injected = new InjectedConnector({
  supportedChainIds: [97, 4, 37, 80001],
});

const ALL_SUPPORTED_CHAIN_IDS = [97, 4, 37, 80001];

export const RPC_NETWORK_URLS = {
  137: ALCHEMY_POLYGON_MAINNET_URL,
  80001: ALCHEMY_POLYGON_MUMBAI_URL,
};

const walletConnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: RPC_NETWORK_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

// Uauth

export const uauth = new UAuthConnector({
  clientID: "e617be18-0b53-4c49-8261-0dd46362c893",
  // redirectUri: "http://127.0.0.1:3000",
  redirectUri: "https://pro-mint.vercel.app",
  scope: "openid wallet",

  // Injected and walletconnect connectors are required.
  connectors: { injected, walletConnect },
});

export const connectors = { injected, walletConnect, uauth };
