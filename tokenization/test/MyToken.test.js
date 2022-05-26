require("dotenv").config({path: "../.env"});

const chai = require("./setupchai");
const expect = chai.expect;
const BN = web3.utils.BN;

const Token = artifacts.require("MyToken");

contract("Token test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    it("all tokens should be in my account", async() => {
        const instance = this.myToken;
        const totalSupply = await instance.totalSupply();
        // const balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        // expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens betweebn accounts", async () => {
        const instance = this.myToken;
        const sendTokens = 1;
        const totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("is not possible to send more tokens than available in total", async () => {
        const instance = this.myToken;
        const balanceOfDeployer = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.eventually.a.bignumber.equal(balanceOfDeployer);
    });
});


