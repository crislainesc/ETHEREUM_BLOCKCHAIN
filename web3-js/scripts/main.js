const instance = new Web3(
  new Web3.providers.HttpProvider("http://localhost:7545")
);

instance.eth.getAccounts().then(console.log);

const myContract = new instance.eth.Contract(
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

myContract.methods
  .myUint()
  .call()
  .then((result) => console.log(result.toString()));

myContract.methods
  .setUint(51)
  .send({
    from: "0x102498AB48DDBeE4ce2F04303188735C36242c9f",
  })
  .then(console.log);
