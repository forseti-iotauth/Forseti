const ledger = require('./ledger');
const zkp = require('./zkp')
const deviceId = 'pulb';


var deviceID="abc"

async function isUserAuthenticated(deviceID) {
	preProof = ledger.getDevicePreProof(deviceID)
	try {
		const result = await verifyProof(credentialHash); 
		console.log(result)
		return result
	} catch (error) {
		console.error(`发生错误: ${error.message}`);
	}
}


const sign = 'alice';
const timestamp = '2022';
const token = 'auth';

//console.log(cratePreProof(sign, timestamp, token)); 
//createProof(sign, timestamp, token)
isAuthenticated(deviceID)
