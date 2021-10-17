import {ethers} from "ethers";
import abi from '../../artifacts/contracts/BeerPortal.sol/BeerPortal.json';
import { BeerPortal } from '../../typechain/BeerPortal';
import { useAppState } from '../context/AppState';
import { Beer } from '../types/Beer.interface';

const CONTRACT_ADDRESS = '0xC113dC65227073627f4eDbE65C5311d17Ee968Cd';

export const checkIfWalletIsConnected = async (): Promise<any> => {
    try {
        /*
         * Check if we're authorized to access the user's wallet
         */

        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have metamask!');
        } else {
            console.log('We have the ethereum object', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('Found an authorized account:', account);

            const beers = await getAllBeers();
            console.log('Beers', beers);
            return { account, beers };
        } else {
            console.log('No authorized account found');
        }
    } catch (error) {}
};

export const connectWallet = async (setWallet: (account: any) => void) => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        } else {
            console.log('We have the ethereum object', ethereum);
        }

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });

        console.log('Connected', accounts[0]);
        setWallet(accounts[0]);
    } catch (error) {
        console.log(error);
    }
};

export const beer = async (
    message: string,
    favBeer: string
): Promise<Beer[]> => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractABI = abi.abi;

            const contractAddress = CONTRACT_ADDRESS;

            const beerPortalContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            let count = await beerPortalContract.getTotalBeers();
            console.log('Retrieved total wave count...', count.toNumber());

            /*
             * Execute the actual beer from your smart contract
             */
            const beerTxn = await beerPortalContract.beer(message, favBeer);
            console.log('Mining...', beerTxn.hash);

            await beerTxn.wait();
            console.log('Mined -- ', beerTxn.hash);
            const beers = (await getAllBeers()) || [];
            return beers;
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error);
    }
};

const getContract = () => {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractABI = abi.abi;

    const contractAddress = CONTRACT_ADDRESS;

    const beerPortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    return beerPortalContract as BeerPortal;
};

export const getAllBeers = async () => {
    try {
        const {ethereum} = window;

        if (ethereum) {
            const beerPortalContract = getContract();

            console.log("Contract", beerPortalContract);
            const beers = await beerPortalContract.getAllBeers();

            return beers.map((beer) => ({
                address: beer.sender,
                timestamp: (new Date(Number(beer.timestamp) * 1000)).toString(),
                message: beer.message,
                favBeer: beer.favBeer,
            }));
        }
    } catch (error) {
    }
};