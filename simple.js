var webPage = require('webpage');
var page = webPage.create(); 
var args = require('system').args;
console.log(args[1]);
page.onError = function(msg, trace) {};
page.open(args[1], function(status) {
  console.log('Status: ' + status);
  phantom.exit();
});
