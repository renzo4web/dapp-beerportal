// Copyright Renzo R 2021. All Rights Reserved
// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BeerPortal {
    uint256 totalBeers;

    event newBeer(address indexed from, uint256 timestamp, string message, string favBeer);


    struct Beer {
        address sender;
        string message;
        string favBeer;
        uint256 timestamp;
    }


    Beer[] beers;


    constructor() payable {
        console.log("Look at this smart contract");
    }

    function beer(string memory _message, string memory _favBeer) public {
        totalBeers += 1;
        console.log("%s has sent a Beer!", msg.sender);

        beers.push(Beer(msg.sender, _message, _favBeer, block.timestamp));

        emit newBeer(msg.sender, block.timestamp, _message, _favBeer);

        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );

        (bool success,) = (msg.sender).call{value : prizeAmount}(" ");

        require(success, "Failed to withdraw money from contract.");
    }

    function getAllBeers() public view returns (Beer[] memory){
        return beers;
    }

    function getTotalBeers() public view returns (uint256){
        console.log("We have %d toal of beers!!!", totalBeers);
        return totalBeers;
    }

}

