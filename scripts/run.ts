/* eslint-disable no-process-exit */
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

const main = async (): Promise<void> => {
  const [owner, randomPerson] = await ethers.getSigners();
  const beerContractFactory: ContractFactory = await ethers.getContractFactory(
    "BeerPortal"
  );
  const beerContract: Contract = await beerContractFactory.deploy();
  await beerContract.deployed();

  console.log(`Contract deploy to: ${beerContract.address}`);
  console.log(`Contract deploy by: ${owner.address}`);

  let beerCount;
  beerCount = await beerContract.getTotalBeers();

  let beerTxn = await beerContract.beer();
  await beerTxn.wait();

  // test multiplayer
  beerTxn = await beerContract.connect(randomPerson).beer();
  await beerTxn.wait();

  beerCount = await beerContract.getTotalBeers();
  console.log(`Current number of beers : ${beerCount}`);
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
