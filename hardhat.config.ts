import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/types";

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.19" }, { version: "0.8.20" }],

    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 200,
    //   },
    // },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
