import hre from 'hardhat';

async function main() {
    const deployedContract = await hre.ethers.deployContract("ArchivaRegistry");
  await deployedContract.waitForDeployment();
  console.log(`ArchivaRegistry deployed to ${deployedContract.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });