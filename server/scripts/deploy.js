const hre = require("hardhat");

async function main(){

  const Contractx = await hre.ethers.getContractFactory("ChatACL");
  const contractx = await Contractx.deploy();

  await contractx.deployed();
  console.log("Contract is deployed to:",contractx.address);
}

main().then(()=> process.exit(0)).catch(error=>{
  console.error(error);
  process.exit(1);
});
