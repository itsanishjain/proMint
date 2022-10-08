export const STREAM_ID = "0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/";
export const TABLE_NAME = "_80001_2123";

export const landStatus = [
  {
    text: "Sold",
    color: "#00FF47",
  },
  {
    text: "Auction",
    color: "#FAFF00",
  },
  {
    text: "Sale",
    color: "#FF0000",
  },
];

export const landType = [
  {
    text: "Alparius",
    color: "#C94443",
  },
  {
    text: "Betarius",
    color: "#46436E",
  },

  {
    text: "Gammarius",
    color: "#54A095",
  },
];

export const ALCHEMY_POLYGON_MAINNET_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;

export const ALCHEMY_POLYGON_MUMBAI_URL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
