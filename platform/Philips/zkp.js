const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');

const createProofExe = path.join(__dirname, 'MPC_SHA256');
const verifyProofExe = path.join(__dirname, 'MPC_SHA256_VERIFIER');
var credential = 'input1';
const preProof = '1EA06586B18E8FCE1B923EFF26FD8252F617F0EFD4E49820E8E9BEE0614E5792';

function createPreProof(sign, timestamp, token) {
  
  const inputString = `${sign}${timestamp}${token}`;
  
  const hash = crypto.createHash('sha256').update(inputString).digest('hex');
  
  return hash;

}

function createProof(sign, timestamp, token) {
	const credential = `${sign}${timestamp}${token}`
	credential_new = credential+'1'
	const command = `${createProofExe} ${credential_new}`;
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`execute err: ${error.message}`);
			return;
		}

		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}

		console.log(`stdout: ${stdout}`);
	});
}


function verifyProof(preproof) {

  return new Promise((resolve, reject) => {
    exec(verifyProofExe, (error, stdout, stderr) => {
      if (error) {
        console.error(`execute err: ${error.message}`);
        return reject(error); 
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return reject(new Error(stderr)); 
      }


      const proofMatch = stdout.match(/Proof for hash: (\w+)/);
      if (proofMatch && proofMatch[1]) {
        const proofForHash = proofMatch[1];

        if (proofForHash.toUpperCase() === preproof.toUpperCase()) {
          resolve(true); 
        } else {
          resolve(false); 
        }
      } else {
        console.error('Can not find Proof');
        reject(new Error('Can not find Proof')); 
      }
    });
  });
}



async function main() {

  try {
    const result = await verifyProof(credentialHash); 
    console.log(result)
  } catch (error) {
    console.error(`发生错误: ${error.message}`);
  }
}


//main();
//createProof("alice2022auth")


module.exports = {
	createPreProof,
	createProof,
	verifyProof,
};
