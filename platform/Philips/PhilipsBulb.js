'use strict';

const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const hueToken = 'b-3fL5vujy0B2sAzizcouiEaO83aV3e8gHhO4DWO';
const hueAPI = 'https://192.168.123.223/api/' + hueToken + '/lights/19';

var deviceID = 'bulbs'

function toggleDevice(command) {
  axios.put(
    hueAPI + '/state',
    { on: command }, 
    { httpsAgent }
  )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response ? error.response.data : error.message); 
    });
}

function getDeviceID() {
	//console.log(deviceID)
	return deviceID
}


// Toggle(false); 

module.exports = {
    toggleDevice,
    getDeviceID,
};

