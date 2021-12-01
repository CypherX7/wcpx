require('dotenv').config()
require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
    solidity: "0.8.0",
    networks:{
        matic:{
            url:"https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            accounts: [process.env.PK]
        }
    }
};
