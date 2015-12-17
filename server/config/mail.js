'use strict';

var nodemailer  = require('nodemailer'),
	smtpPool    = require('nodemailer-smtp-pool');


var transporter = nodemailer.createTransport(smtpPool({
		host: 'post.subsys.no',
		port: 465,
		secure: true,
			auth: {
			user: 'kontakt@etdagen.no',
			pass: 'teknologi'
		}
	}));

module.exports = {
	sendMail: function(data, callback) {
		var mailOptions = {
			from: 'E&T-kontakt <kontakt@etdagen.no>',
			to: 'post@etdagen.no',
			subject: data.subject,
			text: 'Fra: ' + data.name + '\nMail: ' + data.email + '\nMelding: ' + data.message
		};

		transporter.sendMail(mailOptions,function(error, info){
			if(error){
				callback(error,null);
			} else {
				callback(null,info);
			}
		});
	}
};
