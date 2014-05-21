/*
 * Entry point to start node server
 */

var server = require('./server.js');
var router = require('./router.js');
var dbClient = require('./DBClient.js');

server.start(router.route, dbClient);