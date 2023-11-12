import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Box.....");
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
  });
  log("Box deployed!");

  const timeLock = await deployments.get("TimeLock");
  //   const timeLock = await ethers.getContractAt("TimeLock", timeLockContract.address);
  const boxContract = await ethers.getContractAt("Box", box.address);

  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
  await transferOwnerTx.wait(1);

  log("It's done!");
};

export default deployBox;
