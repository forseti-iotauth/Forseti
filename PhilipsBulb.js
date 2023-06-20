'use strict';

/*
 ============================================================================
 Name        : PhilipsBulb.js
 Version     : 0.1
 Description : A control command for Philips Bulb.
                You need to have a Philips Hue [1], a Philips Bulb Bridge [2],
                and set proper `hueToken` and `hueAPI` to make it run.
                How to set the correct attributes can refer to [3].
                [1] https://www.lighting.philips.com/main/prof/led-lamps-and-tubes/led-bulbs/LEDBULB_CA/category
                [2] https://www.philips-hue.com/en-us/products/all-products/product-page/hue-bridge#overview
                [3] https://developers.meethue.com/develop/hue-api/lights-api/
 ============================================================================
 */

const axios = require('axios');
const path = require('path');
const https = require('https');

const httpsAgent = new https.Agent({rejectUnauthorized: false});

var hueToken='hL2sEM2bGwgat9dtKXgjLooiJMPnzz9yKr8YRonW'
var hueAPI = 'https://192.168.123.223/api/'+hueToken+'/lights/12'

function Toggle(command) {
	axios.put(hueAPI+'/state', 
	  { on: false },
	  { httpsAgent }
	  )
	  .then(function (response) {
	    console.log(response.data);
	  })
	  .catch(function (error) {
	    console.log(error.data);
	  });
}
