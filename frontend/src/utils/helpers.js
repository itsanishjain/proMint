import { NFTStorage } from "nft.storage";

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const truncateAddress = (address) => {
  if (!address) return "No Account";

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );

  if (!match) return address;

  return `${match[1]}…${match[2]}`;
};

export const nftDotStorage = async (img) => {
  try {
    const metadata = await client.store({
      attributes: [],
      description:
        "A Contract on a IPFS represent that you Join DeadLand succesfully, and in Future you actually own a piece of land in real world where we all dead people come and make us alive ",
      name: "Deadland",
      image: img,
    });
    console.log(metadata);
    return metadata;
  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";
  }
};
