// Copyright Renzo R 2021. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED


pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BeerPortal{
	uint256 totalBeers;

	constructor(){
		console.log("Look at this smart contract");
	}

	function beer() public {
		totalBeers += 1;
		console.log("%s has sended a Beer!", msg.sender);
	}

	function getTotalBeers() public view returns (uint256){
		console.log("We have %d toal of beers!!!", totalBeers);
		return totalBeers;
	}

}

