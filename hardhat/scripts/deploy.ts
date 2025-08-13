import { ethers } from 'hardhat';

async function main() {
  const EnergyCredit = await ethers.getContractFactory('EnergyCredit');
  const energyCredit = await EnergyCredit.deploy();
  await energyCredit.deployed();
  console.log('EnergyCredit deployed to:', energyCredit.address);

  const EnergyAsset = await ethers.getContractFactory('EnergyAsset');
  const energyAsset = await EnergyAsset.deploy();
  await energyAsset.deployed();
  console.log('EnergyAsset deployed to:', energyAsset.address);

  const Marketplace = await ethers.getContractFactory('Marketplace');
  const marketplace = await Marketplace.deploy(energyCredit.address);
  await marketplace.deployed();
  console.log('Marketplace deployed to:', marketplace.address);

  const EnergyLoan = await ethers.getContractFactory('EnergyLoan');
  const energyLoan = await EnergyLoan.deploy(energyCredit.address);
  await energyLoan.deployed();
  console.log('EnergyLoan deployed to:', energyLoan.address);

  const GovernanceToken = await ethers.getContractFactory('GovernanceToken');
  const governanceToken = await GovernanceToken.deploy();
  await governanceToken.deployed();
  console.log('GovernanceToken deployed to:', governanceToken.address);

  const EnergyDAO = await ethers.getContractFactory('EnergyDAO');
  const energyDAO = await EnergyDAO.deploy();
  await energyDAO.deployed();
  console.log('EnergyDAO deployed to:', energyDAO.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
