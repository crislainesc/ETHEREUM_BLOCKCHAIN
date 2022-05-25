const web3 = require("web3");

const instance = new web3(
  new web3.providers.HttpProvider("http://localhost:7545")
);

instance.eth
  .getBalance("0x102498AB48DDBeE4ce2F04303188735C36242c9f")
  .then(console.log);

instance.eth
  .getBalance("0x102498AB48DDBeE4ce2F04303188735C36242c9f")
  .then((result) => console.log(web3.utils.fromWei(result, "ether"), "ETH"));

instance.eth.sendTransaction({
  from: "0x102498AB48DDBeE4ce2F04303188735C36242c9f",
  to: "0xD0eCFEc39832feb7014C5367479da42A463529dA",
  value: web3.utils.toWei("1", "ether"),
});

instance.eth
  .getBalance("0xD0eCFEc39832feb7014C5367479da42A463529dA")
  .then((result) => console.log(web3.utils.fromWei(result, "ether"), "ETH"));

instance.eth
  .call({
    from: "0x102498AB48DDBeE4ce2F04303188735C36242c9f",
    to: "0xD0eCFEc39832feb7014C5367479da42A463529dA",
    data: instance.utils.sha3("myUint()").substr(0, 10),
  })
  .then("Call", console.log);

console.log("My Uint", instance.utils.sha3("myUint()").substr(0, 10));

const contract = new instance.eth.Contract(
  [
    {
      constant: true,
      inputs: [],
      name: "myUnit",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_myUint",
          type: "uint256",
        },
      ],
      name: "setUint",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  "0xb67c3bBda0C5eF77798C04706e7429F3fc4cf0f3"
);

contract.methods.myUint().call().then(console.log);

contract.methods
  .setUint(59)
  .send({
    from: "0x102498AB48DDBeE4ce2F04303188735C36242c9f",
  })
  .then(console.log);
