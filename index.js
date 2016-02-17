/**
 * SMTP Mail Service
 */

var Promise = require('bluebird'),
	nodemailer = require('nodemailer'),
	htmlToText = require('nodemailer-html-to-text').htmlToText;

var Smtp = function(configs){
    // configure transporter
    this.transporter = Promise.promisifyAll(nodemailer.createTransport({
        service : configs.service,
        auth : {
            user : configs.user,
            pass : configs.pass
        }
    }));
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
Smtp.prototype.send = function(author,receiver,subject,content){
    // make request
    return this.transporter.sendMailAsync({
        'from' : author.name+' <'+author.email+'>',
        'to' : receiver,
        'subject' : subject,
        'html' : content
    });
};

module.exports = function(configs) {
	console.log(configs);
    return new Smtp(configs);
};
