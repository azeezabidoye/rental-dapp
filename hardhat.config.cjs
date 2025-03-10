require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

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
      accounts: [
        "8dba19966d85ea2137505039c77d1e6ba35ab560797e51924f3edb939d9d2146",
      ],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
