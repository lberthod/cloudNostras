var exec = require('cordova/exec');
var channel = require('cordova/channel');

function SendGrid(){
	var me = this;
}

SendGrid.prototype.send = function(email, successCallback, errorCallback){
    exec(successCallback, errorCallback, "SendGrid", "sendWithWeb", [email]);
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new SendGrid();
}
