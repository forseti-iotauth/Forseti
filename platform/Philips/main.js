'use strict';

const path = require('path');
const device = require(path.join(__dirname, './PhilipsBulb'));
const ledger = require(path.join(__dirname, './ledger'))
const zkp = require(path.join(__dirname, './zkp'))

var sign = "alice"
var timestamp = "2022"
var token = "auth"

function registerDevice(sign, timestamp, token) {
	var deviceID = device.getDeviceID()
	var preProof = zkp.createPreProof(sign, timestamp, token)
	ledger.registerDevice(deviceID, preProof)
}

function proposeAuthorization(sign, timestamp, token) {
	zkp.createProof(sign, timestamp, token)
}

async function verifyAuthorization() {
	var deviceID = device.getDeviceID()
	var preProof = ledger.getDevicePreProof(deviceID)
	const result = await zkp.verifyProof(preProof)
	//console.log(result)
	return result
}

async function controlDevice(command) {
	const result =  await verifyAuthorization()
	if (result == false) {
		console.log("Unauthorized requirement")
		return
	}
	device.toggleDevice(command)
}

//registerDevice(sign, timestamp, token)
//proposeAuthorization(sign, timestamp, token)
//verifyAuthorization()
//controlDevice()

module.exports = {
	controlDevice,
};
