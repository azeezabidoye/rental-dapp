require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const {} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    crossfiTestnet: {
      chainId: 4157,
      url: "",
      accounts: [""],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
