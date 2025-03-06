require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    crossfiTestnet: {
      chainId: 4157,
      url: "https://crossfi-testnet.g.alchemy.com/v2/wAz9j4RJUgEBiaMljD1yGbi45YRKBXTK",
      accounts: [
        "8dba19966d85ea2137505039c77d1e6ba35ab560797e51924f3edb939d9d2146",
      ],
    },
  },
};
