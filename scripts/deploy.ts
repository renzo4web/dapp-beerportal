/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

const main = async () => {
  const beerContractFactory = await ethers.getContractFactory("BeerPortal");
  const beerContract = await beerContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  });

  await beerContract.deployed();

  console.log("beerPortal address: ", beerContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
