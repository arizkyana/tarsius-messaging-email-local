/**
 * SMTP Mail Service
 */

var Promise = require('bluebird'),
	nodemailer = require('nodemailer'),
	htmlToText = require('nodemailer-html-to-text').htmlToText;

var Local = function(configs){
    // configure transporter
    var configs = configs || {
		"host": "localhost",
		"port": 25,
		"ignoreTLS": true
	};
    this.transporter = Promise.promisifyAll(nodemailer.createTransport(configs));
    this.transporter.use('compile', htmlToText());
};

/**
 * send function
 * @param  {Object} author   { name : {string}, email : {email}  }
 * @param  {String} receiver receiver email address
 * @param  {String} subject  email title / subjects
 * @param  {String} content  html mail content
 * @return {Promise}
 */
Local.prototype.send = function(author,receiver,subject,content){
    // make request
    return this.transporter.sendMailAsync({
        'from' : author.name+' <'+author.email+'>',
        'to' : receiver,
        'subject' : subject,
        'html' : content
    });
};

module.exports = function(configs) {
    return new Local(configs);
};
