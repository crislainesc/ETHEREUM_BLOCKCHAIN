require("dotenv").config({path: "../.env"});

const chai = require("./setupchai");
const expect = chai.expect;
const BN = web3.utils.BN;

const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
const KycContract = artifacts.require("KycContract");

contract("TokenSale test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount", async () => {
        const instance = await Token.deployed();
        return expect(
            instance.balanceOf(deployerAccount)
        ).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("should all tokens be in the Token Sale Smart Contract by default", async () => {
        const instance = await Token.deployed();
        const baleanceOfTokenSaleSmartContract = await instance.balanceOf(
            TokenSale.address
        );
        const totalSupply = await instance.totalSupply();
        expect(baleanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(
            totalSupply
        );
    });

    it("should be possible to buy tokens", async () => {
        const tokenIstance = await Token.deployed();
        const tokenSaleInstance = await TokenSale.deployed();
        const kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenIstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(tokenIstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    });
});
