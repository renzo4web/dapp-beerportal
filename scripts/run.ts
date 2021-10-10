/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

const main = async (): Promise<void> => {
  const waveContractFactory: ContractFactory = await ethers.getContractFactory(
    "WavePortal"
  );
  const waveContract: Contract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
