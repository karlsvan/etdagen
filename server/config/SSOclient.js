'use strict';

var fs     = require('fs'),
    crypto = require('crypto');

function SSOclient(data, sign64, clientip, target){
	// set initial values
	this.loginvalues = {};
	this.crtfile = "/home/etstaff/etdagen.no/etdagen/server/config/innsida.crt";
	this.verifies = false;
	this.oktime = false;
	this.reason = "";
	this.okip = true; // IP-check removed
	this.oktarget = false;

	// parse the data-field
	var dataar=data.split(",");
	while(dataar.length > 0) {
		var k = dataar.shift();
		this.loginvalues[k] = dataar.shift();
		// if this value is a list
		if(this.loginvalues[k].indexOf(":") != -1){
			this.loginvalues[k] = this.loginvalues[k].split(":");
		}
	}

	// check the target
	if(this.loginvalues['target'] == target){
		this.oktarget = true;
	} else {
		this.reason = "wrong target";
	}

	// check the timestamp
	var d = Date.now();
	var tdif = this.loginvalues['time'] - d/1000;
	console.log('query time: '+this.loginvalues['time']+' | time diff: '+tdif);
	if ((tdif > -120) && (tdif < 120)) {
		this.oktime = true;
	} else {
		this.reason = "wrong time";
	}


	var keyPath = this.crtfile;
	var key = fs.readFileSync(keyPath);

	var verifier = crypto.createVerify('SHA1');
	verifier.update(data);
	var res = verifier.verify(key, sign64, 'base64');

	if (res) {
		this.verifies = true;
	} else {
		this.verifies = false;
	}
}

SSOclient.prototype.getVerifies = function() {
	return this.verifies;
};

SSOclient.prototype.getOktime = function() {
	return this.oktime;
};

SSOclient.prototype.getOktarget = function() {
	return this.oktarget;
};

SSOclient.prototype.getLoginvalues = function() {
	return this.loginvalues;
};

SSOclient.prototype.getReason = function() {
	return this.reason;
};

SSOclient.prototype.oklogin = function() {
	if (this.oktime && this.verifies && this.oktarget) {
		return true;
	} else {
		return false;
	}
};

module.exports = SSOclient;
