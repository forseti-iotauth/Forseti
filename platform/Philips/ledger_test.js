// Test Forseti without the requirement of deploying decentralized ledger 
// To use this file, replace ledger_test.js with ledger.js

const fs = require('fs');
const path = require('path');
var Blockchain=path.join(__dirname, 'registerInfo.json')
var deviceID="abc"

function isDeviceRegistered(deviceID) {
  try {
    
    const data = fs.readFileSync(Blockchain, 'utf-8');

    
    const devices = JSON.parse(data);

    
    if (!Array.isArray(devices)) {
      throw new TypeError('Parsed data is not an array');
    }

    
    const device = devices.find(d => d.deviceID === deviceID);

    
    return device ? true: false;
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    return null;
  }
}

function registerDevice(deviceID, preproof) {
    const filePath = './registerInfo.json';

    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        
        let registerInfo;
        try {
            registerInfo = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }

        
        const deviceExists = registerInfo.some(device => device.deviceID === deviceID);
        if (deviceExists) {
            console.log(`Device with ID ${deviceID} already exists.`);
            return;
        }

        
        registerInfo.push({ deviceID, preproof });

        
        fs.writeFile(filePath, JSON.stringify(registerInfo, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return;
            }
            console.log(`Device ${deviceID} registered successfully.`);
        });
    });
}

function getDevicePreProof(deviceID) {
	try {
		const data = fs.readFileSync(Blockchain, 'utf-8');
		
		const devices = JSON.parse(data);

		const device = devices.find(d => d.deviceID === deviceID);

		return device ? device.preproof : null;
	} catch (error) {
		console.error('Error reading or parsing the file:', error);
		return null;
	}
}


//registerDevice("deviceTest2", "caass")
//res = isDeviceRegistered(deviceID)
//console.log(res);
//const preproof = getDevicePreProof(deviceID);
//console.log('Preproof:', preproof);


module.exports = {
    isDeviceRegistered,
    registerDevice,
    getDevicePreProof,
};
