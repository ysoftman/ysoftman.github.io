// var http = require("http");
// var server = http.createServer(function(request, response){
//     response.writeHead(200, {'Content-Type':'text/html'});
//     response.end("Hello Node.JS!");
// });
// server.listen(8080, function(){
//     console.log("server start")
// })

// static 리소스 서빙
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('listening on http://127.0.0.1:8080');
});
