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

  it("Should allow renter to check out a car", async function () {
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

    await rental.checkOut(renter.address);
    const updatedRenter = await rental.renters(renter.address);
    expect(updatedRenter.active).to.be.true;
    expect(updatedRenter.canRent).to.be.false;
  });

  it("Should allow renter to check in a car", async function () {
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

    await rental.checkOut(renter.address);
    await rental.checkIn(renter.address);

    const updatedRenter = await rental.renters(renter.address);
    expect(updatedRenter.active).to.be.false;
  });
});
