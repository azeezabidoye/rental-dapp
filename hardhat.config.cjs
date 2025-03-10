require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const { CROSSFI_ALCHEMY_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    crossfiTestnet: {
      chainId: 4157,
      url: CROSSFI_ALCHEMY_URL,
      accounts: [],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
