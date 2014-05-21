/*
 * Router is responsible for route different request
 */ 

function route(pathname, response, request, dbClient) {
	console.log('About to route request for ' + pathname);
	if (request.method == 'POST') {
		console.log(pathname + " is POST request");
		dbClient.storeDB(request, response);
	} else if (request.method == 'GET') {
		console.log(pathname + ' is GET method');
		if (pathname == '/') {
			showHomePage(response);
			return;
		} else if (pathname == '/favicon.ico') {
			return;
		}
		dbClient.searchDB(pathname, response);
	} else {
		showGenericErrorPage();
	}
}

function showHomePage(response) {
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload"'+
    'method="post">'+
    '<p>Url you want to shorten</p>' + 
    '<input type="text" name="originalUrl">'+
    '<br/>' + 
    '<p>TinyUrl you want to map</p>' + 
    '<input type="text" name="tinyUrl">'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(body);
    response.end();
}

function showGenericErrorPage(response) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<p> Invalid Request </p>'+
    '</body>'+
    '</html>';

    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.write(body);
    response.end();
}


exports.route = route;