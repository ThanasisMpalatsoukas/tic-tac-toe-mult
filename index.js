var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static(__dirname + '/assets'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let userCount = 0;

io.on('connection', (socket) => {


    io.emit('new_connection', userCount);

    userCount++;

    socket.on('username', () => {
        io.emit('userid', userCount);
    });

    socket.on('disconnect', () => {
        userCount--;
        io.emit('player_disconnected', (userCount));
    });

    socket.on('played', (move) => {
        io.emit('played', move);
    });

});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:3000'); 
});
