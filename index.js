var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {
    io.emit('new-user', 'new user connect to chat');
    console.log('a user connected');

    // server received new message event
    socket.on('new-message', function(msg) {
        // server broadcast new message event to clients
        io.emit('new-message', msg);
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function(){
        io.emit('left-user', 'user left the chat');
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});