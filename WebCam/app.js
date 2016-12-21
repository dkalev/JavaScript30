const express = require('express');
const app = express();
//can't pass server to io before the server is listening
const server = app.listen(8080);
const io = require('socket.io').listen(server);


app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.sendFile('index.html')
}); 
    
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});