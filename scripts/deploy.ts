/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const Token: ContractFactory = await ethers.getContractFactory("BeerPortal");
  const portal = await Token.deploy();

  console.log("BeerPortal address: ", portal.address);
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
