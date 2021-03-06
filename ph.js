var fs = require('fs'),
    system = require('system');
var webPage = require('webpage');
var async = require('async');

if (system.args.length < 2) {
    console.log("Usage: phantomjs " + system.args[0] + " sites_list.txt");
    phantom.exit(1);
}
console.log("Starting...");
var content = '',
    f = null,
    lines = null,
    eol = system.os.name == 'windows' ? "\r\n" : "\n";

try {
    f = fs.open(system.args[1], "r");
    content = f.read();
} catch (e) {
    console.log(e);
}

if (f) {
    f.close();
}

var sumTime = 0;
var siteList = [];

if (content) {
    lines = content.split(eol);
    for (var i = 0, len = lines.length; i < len; i++) {
    	lines[i] = lines[i].split(String.fromCharCode(13))[0];
    	if (lines[i] != ""){
    		/*sites++;
			*/
			
			siteList.push(lines[i]);
		}
        
    }
}



var start, end, time, page;
async.mapSeries(
	siteList, 
	function(url, callback){
		start = new Date().getTime();
		page = webPage.create(); 
        page.onError = function(msg, trace) {};
		page.open(url, function(status) {
			var end = new Date().getTime();
			var time = end - start;
			console.log(url + ' - status: ' + status + ', loading time: ' + time + 'ms');
			sumTime += time;
			callback(null, status);
		});
	}, 
	function(err, results){
		console.log("=================================");
		console.log("Sites finished: " + siteList.length);
		console.log("Overall time: " + sumTime + "ms");
		phantom.exit();
	}
);
