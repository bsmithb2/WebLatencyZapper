// Zapper Server
// In Node.

// Name and port of the NEXT server come from the command line.
NEXT_SERVER_NAME = process.argv[2] || "EOL";
NEXT_SERVER_PORT = process.argv[3] || "EOL";

// Current port of this server
SERVER_PORT = process.argv[4] || 8000; // to allow running multiple server on the same machine.

// Load the http module to create an http server.
var express = require('express');
var server	= express.createServer();
server.use(express.bodyParser());

// open the public directory
server.use(express.static(__dirname + '/public')); 

// Receive a payload, and echo it right back in the response
server.post('/zap', function (request, response) {
	response.send(request.body);
});

// Serve up the public pages
server.get('/', function (req, res) { res.sendfile(__dirname + '/public/index.html'); });
server.get('/nextzap', function (req, res) { res.send({server: NEXT_SERVER_NAME, port: NEXT_SERVER_PORT}) });
	

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(SERVER_PORT);

// Put a friendly message on the terminal
console.log("Zapper running on port " + SERVER_PORT);
console.log("Next Zapper is http://" + NEXT_SERVER_NAME + ":" + NEXT_SERVER_PORT);
