/*
 * Create the node server here
 */

var http = require('http'),
	url = require('url');

function start(route, dbClient) {
	function onRequest(request, response) {
		// This would be the url key
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received');
		route(pathname, response, request, dbClient);
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server start on 8888');
}

exports.start = start;