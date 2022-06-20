const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

const metadataURL = "https://minter-bay.vercel.app/api";

async function main() {
  const NFTeeContract = await ethers.getContractFactory("NFTee");
  const deployedNFTeeContract = await NFTeeContract.deploy();
  console.log("Contract Address:", deployedNFTeeContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
