import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const governorContract = await deployments.get("MyGovernor");
  const timeLockContract = await deployments.get("TimeLock");

  const governor = await ethers.getContractAt(
    "MyGovernor",
    governorContract.address
  );
  const timeLock = await ethers.getContractAt(
    "TimeLock",
    timeLockContract.address
  );

  log("Setting up roles...");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.DEFAULT_ADMIN_ROLE();

  const proposerTx = await timeLock.grantRole(
    proposerRole,
    governorContract.address
  );
  await proposerTx.wait(1);
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);
  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);

  log("Roles has been set up!");
};

export default setupContract;
