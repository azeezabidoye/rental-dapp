const { ethers } = require("hardhat");
// const { expect } = require("chai");

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
      0,
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
      0,
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
      0,
    );

    await rental.checkOut(renter.address);
    await rental.checkIn(renter.address);

    const updatedRenter = await rental.renters(renter.address);
    expect(updatedRenter.active).to.be.false;
  });

  it("Should allow renter to deposit funds", async function () {
    await rental.deposit(renter.address, { value: ethers.parseEther("1") });
    const renterBalance = await rental.balanceOfRenter(renter.address);
    expect(renterBalance).to.equal(ethers.parseEther("1"));
  });

  it("Should allow renter to make payment and reset status", async function () {
    await rental.addRenter(
      renter.address,
      "John",
      "Doe",
      true,
      false,
      ethers.parseEther("1"),
      ethers.parseEther("0.05"),
      0,
      0,
    );

    await rental.deposit(renter.address, { value: ethers.parseEther("1") });
    await rental.makePayment(renter.address, {
      value: ethers.parseEther("0.05"),
    });

    const updatedRenter = await rental.renters(renter.address);
    expect(updatedRenter.canRent).to.be.true;
    expect(updatedRenter.amountDue).to.equal(0);
  });

  it("Should not allow renter to check out with pending balance", async function () {
    await rental.addRenter(
      renter.address,
      "John",
      "Doe",
      true,
      false,
      ethers.parseEther("1"),
      ethers.parseEther("0.05"),
      0,
      0,
    );

    await expect(rental.checkOut(renter.address)).to.be.revertedWith(
      "You have a pending balance!",
    );
  });
});
