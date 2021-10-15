// Copyright Renzo R 2021. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED


pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BeerPortal{
	uint256 totalBeers;

	event newBeer(address indexed from, uint256 timestamp, string message,string favBeer);


	struct Beer {
		address sender;
		string message;
		string favBeer;
		uint256 timestamp;
	}


	Beer[] beers;


	constructor(){
		console.log("Look at this smart contract");
	}

	function beer(string memory _message, string memory _favBeer) public {
		totalBeers += 1;
		console.log("%s has sended a Beer!", msg.sender);

		beers.push(Beer(msg.sender, _message, _favBeer, block.timestamp));

		emit newBeer(msg.sender, block.timestamp, _message, _favBeer);
	}

	function getAllBeers() public view returns (Beer[] memory){
		return beers;
	}

	function getTotalBeers() public view returns (uint256){
		console.log("We have %d toal of beers!!!", totalBeers);
		return totalBeers;
	}

}

