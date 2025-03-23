import hre from 'hardhat';

async function main() {
    const deployedContract = await hre.ethers.deployContract("SimpleStorage");
  await deployedContract.waitForDeployment();
  console.log(`Counter contract deployed to ${deployedContract.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });