const { Web3 } = require('web3')

const web3 = new Web3('http://127.0.0.1:8545/')

// create a new Web3.js account object with the private key of a Hardhat test account
const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
// the account is created with a wallet, which makes it easier to use
const sender = web3.eth.accounts.wallet.add(privateKey)[0];


// const sender = web3.eth.accounts.wallet.create(1)[0];

// generate a new random Web3.js account object to receive the transaction
const receiver = web3.eth.accounts.create();

web3.eth
  .sendTransaction({
    from: sender.address,
    to: receiver.address,
    value: 100,
  })
  .on("sending", (sending) => {
    console.log("Sending:", sending);
  })
  .on("sent", (sent) => {
    console.log("Sent:", sent);
  })
  .on("transactionHash", (transactionHash) => {
    console.log("Transaction Hash:", transactionHash);
  })
  .on("receipt", (receipt) => {
    console.log("Receipt:", receipt);
  })
  .on("confirmation", (confirmation) => {
    console.log("Confirmation:", confirmation);
    process.exit(0);
  })
  .on("error", (error) => {
    console.log("Error:", error);
    process.exit(1);
  });
