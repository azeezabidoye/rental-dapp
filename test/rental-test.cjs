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

  it("Should add a renter successfully", async function () {
    await rental.addRenter(
      renter.address,
      "John",
      "Doe",
      true,
      false,
      ethers.parseEther("1"),
      0,
      0,
      0
    );

    const addedRenter = await rental.renters(renter.address);
    expect(addedRenter.firstName).to.equal("John");
    expect(addedRenter.canRent).to.be.true;
  });
});
