const express = require('express');
const socket = require('socket.io');
const routes = require('./routes/index.js');
const path = require('path');
const bodyParser = require('body-parser');



var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

var server = app.listen(8080, function(){
    console.log('Listening to request on port 8080...');
});

app.use(express.static('public'));

app.use('/', routes);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "hjs");


var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});