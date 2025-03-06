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

    // Function for adding a Renter to the list of "Renters"
    function addRenter(address payable walletAddress,
        string memory firstName,
        string memory lastName,
        bool canRent,
        bool active,
        uint balance,
        uint amountDue,
        uint start,
        uint end) public {
            renters[walletAddress] = Renter(payable (walletAddress), firstName, lastName, canRent, active, balance, amountDue, start, end);
    }
}