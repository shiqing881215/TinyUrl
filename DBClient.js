/*
 * MongoDB interface deal with db save and data retrieve
 */
 
var MongoClient = require('mongodb').MongoClient;
    format = require('util').format;

// Store the tiny url mapping in the database
function storeDB(request, response) {
	var chunk = '';
    request.on('data', function (data) {
        chunk += data;
    });
    request.on('end', function () {
        console.log("Get POST data : " + chunk);
        var originalUrl = chunk.substring(chunk.indexOf('=')+1,chunk.indexOf('&'));
        var tinyUrl = chunk.substring(chunk.lastIndexOf('=')+1);
        console.log('originalUrl : ' + originalUrl + ' ; tinyUrl : ' + tinyUrl);

        MongoClient.connect('mongodb://127.0.0.1:27017/mydb', function(err, db) {
            if(err) throw err;

            var collection = db.collection('tinyUrl');
            collection.insert({'originalUrl':originalUrl,'tinyUrl':tinyUrl}, function(err, docs) {
                collection.count(function(err, count) {
                    console.log(format('count = %s', count));
                });

                collection.find().toArray(function(err, results) {
                    console.dir(results);
                    db.close();
                });

                response.writeHead(200, {'Content-Type' : 'text/html'});
                response.write('Your tinyUrl is stored successfully in database');
                response.end();
            });
        });
    });  
}

// Retrive the real url from db based on the tiny pathname from request
function searchDB(pathname, response) {
    pathname = pathname.substring(1);
    console.log('Search real url for tinyUrl : ' + pathname);
    MongoClient.connect('mongodb://127.0.0.1:27017/mydb', function(err, db) {
        if(err) throw err;

        db.collection('tinyUrl').find({'tinyUrl':pathname}).toArray(function(err, results) {
            console.log(results);
            var realUrl = results[0]['originalUrl']; 
            console.log('Found the real url ' + realUrl);

            redirect(realUrl, response);

            db.close();
        });
    });
}

// Redirect to the real url
function redirect(url, response) {
    console.log('redirect to ' + url);
    response.writeHead(301, {Location: 'http://' + url});
    response.end();
}

exports.storeDB = storeDB;
exports.searchDB = searchDB;