require("dotenv").config({path: "../.env"});

const MyToken = artifacts.require("./MyToken.sol");
const MyTokenSale = artifacts.require("./MyTokenSale.sol");
const MyKycContract = artifacts.require("./KycContract.sol");

module.exports = async function(deployer) {
    const address = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyTokenSale, 1, address[0], MyToken.address, MyKycContract.address);

    const instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS)
}