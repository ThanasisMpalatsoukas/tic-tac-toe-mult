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

    userCount++;

    socket.on('username', () => {
        io.emit('userid', userCount);
    });

    socket.on('disconnect', () => {
        userCount--;
    });

    socket.on('played', (move) => {
        console.log(move);
        io.emit('played', move);
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
