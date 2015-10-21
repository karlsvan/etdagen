	function User() {
		 this.properties = {};/*
		 id:null
		,fornavn:null
		,etternavn:null
		,tlf:null
		,email:null
		,facebookId:null
		,bedriftid:null
		,status:null
		,inaktiv:null
		,password:null
		,username:null
		,salt:null
		,email_optout:null
		,adresse:null
		,nasjonalitet:null
		,utgangsaar:null
		,linje:null
		,fodselsdato:null
		,registrert:null
		,endret:null};*/
		this.findOrCreate = function(obj, callback) {
			db.get.user(obj ,function (error, rows, fields){
				if(!rows) {
					//make user
					console.log('make user');
				} else {
					var test = callback(error,rows);
					console.log('test:  '+test);
				}
			});
		};
	}