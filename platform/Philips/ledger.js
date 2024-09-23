// index.js
const fs = require('fs');
const path = require('path');
var blockchain = require('../../ledger/blockchain/API');
var deviceID = "abc";

async function isDeviceRegistered(deviceID) {
    let bcResult = await blockchain.query_permission(deviceID);
    return bcResult;
}

async function registerDevice(deviceID, owner) {
    await blockchain.register_permission(deviceID, owner);
}

async function getDevicePreProof(deviceID) {
    let bcResult = await blockchain.query_permission(deviceID);
    return bcResult ? bcResult.ownerAuth : null; 
}

// await registerDevice("deviceTest2", "caass");
// let res = await isDeviceRegistered(deviceID);
// console.log(res);
// const preproof = await getDevicePreProof(deviceID);
// console.log('Preproof:', preproof);

module.exports = {
    isDeviceRegistered,
    registerDevice,
    getDevicePreProof,
};

