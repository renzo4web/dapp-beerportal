import { ethers } from "ethers";
import abi from "../utils/BeerPortal.json";

export const checkIfWalletIsConnected = async (
  setAccount: (account: any) => void
): Promise<any> => {
  try {
    /*
     * Check if we're authorized to access the user's wallet
     */

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setAccount(account);
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {}
};

export const connectWallet = async (setWallet: (account: any) => void) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
    setWallet(accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

export const beer = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractABI = abi.abi;

      const contractAddress = "0xD82DD1eFA18873cbd55365d3F85211Ab4fB1A5e1";

      const beerPortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let count = await beerPortalContract.getTotalBeers();
      console.log("Retrieved total wave count...", count.toNumber());

      /*
       * Execute the actual wave from your smart contract
       */
      const beerTxn = await beerPortalContract.beer();
      console.log("Mining...", beerTxn.hash);

      await beerTxn.wait();
      console.log("Mined -- ", beerTxn.hash);

      count = await beerPortalContract.getTotalBeers();
      console.log("Retrieved total wave count...", count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};
