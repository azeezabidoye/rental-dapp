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
    mapping(address => Renter) public renters;

    // Function for adding a Renter to the list of "Renters"
    function addRenter(
        address payable walletAddress,
        string memory firstName,
        string memory lastName,
        bool canRent,
        bool active,
        uint balance,
        uint amountDue,
        uint start,
        uint end
    ) public {
        renters[walletAddress] = Renter(
            payable(walletAddress),
            firstName,
            lastName,
            canRent,
            active,
            balance,
            amountDue,
            start,
            end
        );
    }

    // Checkout car ==> Rent a new car
    function checkOut(address payable walletAddress) public {
        require(
            renters[walletAddress].amountDue == 0,
            "You have a pending balance!"
        );
        require(
            renters[walletAddress].canRent == true,
            "Can't rent a car at the moment!"
        );
        renters[walletAddress].canRent = false;
        renters[walletAddress].active = true;
        renters[walletAddress].start = block.timestamp;
    }

    // Check-in car ==> Return rented car
    function checkIn(address payable walletAddress) public {
        require(
            renters[walletAddress].active == true,
            "Kindly checkout the car!"
        );
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;

        // Set amount due
        setDueAmount(walletAddress);
    }

    // Calculate the Timespan
    function renterTimespan(uint start, uint end) internal pure returns (uint) {
        return end - start;
    }

    // Get total duration of car use
    function getTotalDuration(
        address payable walletAddress
    ) public view returns (uint) {
        require(
            renters[walletAddress].active == false,
            "The car is currently checked out!"
        );
        uint timespan = renterTimespan(
            renters[walletAddress].start,
            renters[walletAddress].end
        );
        uint timespanInMinutes = timespan / 60;
        return timespanInMinutes;
    }

    // Get contract balance
    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }

    // Get Renter's balance
    function balanceOfRenter(
        address payable walletAddress
    ) public view returns (uint) {
        return renters[walletAddress].balance;
    }

    // Set Due amount
    function setDueAmount(address payable walletAddress) internal {
        uint timespanMinutes = getTotalDuration(walletAddress);
        uint fiveMinutesIncrement = timespanMinutes / 5;
        renters[walletAddress].amountDue =
            fiveMinutesIncrement *
            5000000000000000;
    }

    // Reset renter's position after checking-in
    function canRentCar(
        address payable walletAddress
    ) public view returns (bool) {
        return renters[walletAddress].canRent;
    }

    // Deposit fund
    function deposit(address walletAddress) public payable {
        renters[walletAddress].balance += msg.value;
    }

    // Make Payment after check-in
    function makePayment(address walletAddress) public payable {
        require(
            renters[walletAddress].amountDue > 0,
            "You do not have anything due at this time!"
        );
        require(
            renters[walletAddress].balance > 0,
            "You do not have enough fund to cover payment. Please make a deposit!"
        );
        renters[walletAddress].balance -= msg.value;
        renters[walletAddress].canRent = true;
        renters[walletAddress].active = false;
        renters[walletAddress].amountDue = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }
}
