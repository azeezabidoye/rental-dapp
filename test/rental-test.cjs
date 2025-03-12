const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Rental Smart Contract", function () {
  let Rental, rental, owner, renter;

  beforeEach(async function () {
    Rental = await ethers.getContractFactory("Rental");
    [owner, renter] = await ethers.getSigners();
    rental = await Rental.deploy();
    await rental.waitForDeployment();
  });
});
