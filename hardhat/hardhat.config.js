require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: ["91709d7dcd1d9faddcd46d6f9f7422e761eabd418c61142665d6f803c80737a3"] // NEVER commit real private keys
    }
  }
};
