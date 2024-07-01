const { Web3 } = require('web3')

async function main(){
    const web3 = new Web3('http://127.0.0.1:8545/')

    // create a new Web3.js account object with the private key of a Hardhat test account
    const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
    // the account is created with a wallet, which makes it easier to use
    const sender = web3.eth.accounts.wallet.add(privateKey)[0];

    // generate a new random Web3.js account object to receive the transaction
    const receiver = web3.eth.accounts.create();

    // used to calculate the transaction's maxFeePerGas
    const block = await web3.eth.getBlock();

    const transaction = {
        from: sender.address,
        to: receiver.address,
        value: 100,
        // the following two properties must be included in raw transactions
        maxFeePerGas: block.baseFeePerGas * 2n,
        maxPriorityFeePerGas: 100000,
    };


    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        sender.privateKey
      );

    const receipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
    );
    console.log(receipt);
    
}

main()