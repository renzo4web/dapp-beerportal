/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { BeerPortal } from "../typechain";

const main = async (): Promise<void> => {
  const beerContractFactory: ContractFactory = await ethers.getContractFactory(
    "BeerPortal"
  );
  const beerContract: Contract = await beerContractFactory.deploy();
  await beerContract.deployed();
  console.log("Contract addy:", beerContract.address);

  let beerCount;
  beerCount = await beerContract.getTotalBeers();
  console.log(beerCount.toNumber());

  // TESTING

  let beerTxn = await beerContract.beer("hi this is a test", "Quilmens");
  await beerTxn.wait();

  // test multiplayer
  const [_, randomPerson] = await ethers.getSigners();
  beerTxn = await beerContract
    .connect(randomPerson)
    .beer("Second msg", "Braham");
  await beerTxn.wait();

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
