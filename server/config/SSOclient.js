var fs     = require('fs'),
    crypto = require('crypto');


module.exports =  function SSOclient(data, sign64, clientip, target){
    // set initial values
    this.loginvalues = {};
    this.crtfile = "/sti/til/din/lokale/crtfil";
    this.verifies = false;
    this.oktime = false;
    this.reason = "";
    this.okip = true; // IP-check removed
    this.oktarget = false;

    // parse the data-field
    dataar=data.split(",");
    while(k=dataar.shift()){
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
    tdif = this.loginvalues['time'] - ((new Date()).getTime/1000));
    if ((tdif > -10) && (tdif < 10)) {
      this.oktime = true;
    } else {
      this.reason = "wrong time";
    }



    var keyPath = this.crtfile;
    var key = fs.readFileSync(keyPath);

    var verifier = crypto.createVerify('SHA1');
    verifier.update(data);
    var res = verifier.verify(key, sig, 'base64');

    if (res) {
      this.verifies = true;
    } else {
      this.verifies = false;
    }

    // get the public key
    /*
    fp = fopen(this.crtfile, "r");
    cert = fread(fp, 8192);
    fclose(fp);
    pubkey = openssl_get_publickey(cert);
   
    // verify the sig
    if(openssl_verify("data", sign, pubkey) != 1){
      this.verifies = false;
      this.reason = "could not verify signature";
    } else {
      this.verifies = true;
    }
    openssl_free_key(pubkey);*/
  }

  SSOclient.prototype.verifies = function(first_argument) {
    return this.verifies;
  }

  SSOclient.prototype.oktime = function(first_argument) {
    return this.oktime;
  };

  SSOclient.prototype.oktarget = function(first_argument) {
    return this.oktarget;
  };

  SSOclient.prototype.loginvalues = function(first_argument) {
    return this.loginvalues;
  };

  SSOclient.prototype.reason = function(first_argument) {
    return this.reason;
  };

  SSOclient.prototype.oklogin = function(first_argument) {
    if (this.oktime() && this.verifies() && this.oktarget()) {
      return true;
    } else {
      return false;
    }
  };