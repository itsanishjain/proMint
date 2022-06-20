const { NFTStorage, File, Blob } = require("nft.storage");

// Upload via nft.storage clinet

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const nftDotStorage = async (img) => {
  console.log("CALLED  NFT DOT STORAGE");
  try {
    const metadata = await client.store({
      attributes: [
        { trait_type: "Background", value: "Gradient Tres" },
        { trait_type: "Body", value: "Orange Circle" },
        { trait_type: "Face", value: "Smile" },
      ],
      description:
        "A collection. A portion of sales and royalties gets donated to Charity ME, where they raise money for good causes by bribing celebrities.",
      name: "NEVER",
      image: img,
    });
    return metadata;

  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";

  }
};

// upload via nft.storage fetch

const nftDotStorageFetch = async () => {
  try {
    const res = await fetch("https://api.nft.storage/upload", {
      body: img,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const data = await res.json();
    console.log("DATA", data);
    const contentId = data.value.cid;
    console.log("Content ID", contentId);
    return contentId;
  } catch (err) {
    console.log(err, "BIG ERRROR");
    return;
  }
};

const pinataUploadImage = (img) => {
  const form = new FormData();
  form.append("file", img);

  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/files",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: process.env.NEXT_PUBLIC_NFT_PORT_API_KEY,
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    body: form,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

// Here we need to upload Metadata.json to IPFS and then we need to get the content ID from IPFS.
const pinataUploadMetadata = async () => {
  try {
    console.log("Upload Metadata");
    const j = {
      name: "John",
      age: 30,
      city: "New York",
      image:
        "https://ipfs.io/ipfs/QmTrxGsSt7ce56xhWKZomqFhS9FXrkXFL9QjfZzghNRkRW",
    };

    let url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    let option = {
      method: "POST",
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `{
        name: "John",
        age: 30,
        city: "New York",
        image:
          "https://ipfs.io/ipfs/QmTrxGsSt7ce56xhWKZomqFhS9FXrkXFL9QjfZzghNRkRW",
      };`,
    };
    const res = await fetch(url, option);
    const data = await res.json();
    console.log("DATA", data);
  } catch (error) {
    console.log(error, "ERROR IN PINATA UPLOAD METADATA");
  }
};

module.exports = {
  nftDotStorage,
};
