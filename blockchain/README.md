# A demon about how Forseti uses blockchain

In this demo, we use Hyperledger Fabric to build blockchain.

* src: smart contract (i.e., chaincode in Hyperledger Fabric)
* API.js: a calling example for REST API service

## Steps for setting up Forseti's blockchain

1. Setup a blockchain. A detail about how to set up a Hyperledger Fabric can refer to [1]. If you follow the commands correctly, you can get a file named `fabric-sample` which contains all the required files.
2. Deploy smart contract. After that, you can replace files in `src` to file in [2], then follow the commands in [3] to run the smart contract.
3. Setup a REST API service. To make `Platform.js` can call blockchain function, you need to follow the commands in [4] to set up a service. After that, you can use `API.js` to call blockchain.
   [1] https://hyperledger-fabric.readthedocs.io/en/release-2.5/getting_started_run_fabric.html
   [2] https://github.com/hyperledger/fabric-samples/tree/main/asset-transfer-basic/chaincode-typescript/src
   [3] https://hyperledger-fabric.readthedocs.io/en/release-2.5/deploy_chaincode.html
   [4] https://github.com/hyperledger/fabric-samples/tree/main/asset-transfer-basic/rest-api-typescript