// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Rental {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Add a new Renter
    struct Renter {
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint amountDue;
        uint start;
        uint end;
    }

    // Mapping wallet addresses to each Renter
    mapping (address => Renter) public renters;
}