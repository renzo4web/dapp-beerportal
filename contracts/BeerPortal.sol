// Copyright Renzo R 2021. All Rights Reserved
// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BeerPortal {
    uint256 totalBeers;

    uint256 private seed;

    event newBeer(address indexed from, uint256 timestamp, string message, string favBeer);


    struct Beer {
        address sender;
        string message;
        string favBeer;
        uint256 timestamp;
    }


    Beer[] beers;

    mapping(address => uint256) public lastBeerAt;


    constructor() payable {
        console.log("Look at this smart contract");
    }

    function beer(string memory _message, string memory _favBeer) public {

        //        ANTI SPAM

        require(
            lastBeerAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        //        UPDATE THE CURRENT TIMESTAMP

        lastBeerAt[msg.sender] = block.timestamp;

        totalBeers += 1;
        console.log("%s has sent a Beer!", msg.sender);

        beers.push(Beer(msg.sender, _message, _favBeer, block.timestamp));

        //        Generate pseudo rnd num 0 -100

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated %s", randomNumber);

        //        Set the generated rnd # as the seed for the next beer

        seed = randomNumber;

        if (randomNumber <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            (bool success,) = (msg.sender).call{value : prizeAmount}(" ");

            require(success, "Failed to withdraw money from contract.");
        }

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

