/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

const main = async (): Promise<void> => {
  const beerContractFactory: ContractFactory = await ethers.getContractFactory(
    "BeerPortal"
  );
  const beerContract: Contract = await beerContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await beerContract.deployed();
  console.log("Contract addy:", beerContract.address);

  /*
   *   Get contract balance
   * */

  let contractBalance = await ethers.provider.getBalance(beerContract.address);

  console.log("Contract Balance", ethers.utils.formatEther(contractBalance));

  let beerCount;
  beerCount = await beerContract.getTotalBeers();
  console.log(beerCount.toNumber());

  /*
   *   Send Beer
   * */
  const beerTxn = await beerContract.beer("hi this is a test", "Quilmens");
  await beerTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */

  contractBalance = await ethers.provider.getBalance(beerContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const allBeers = await beerContract.getAllBeers();
  console.log(allBeers);
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

// Copyright Renzo R 2021. All Rights Reserved
