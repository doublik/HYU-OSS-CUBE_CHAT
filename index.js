const express = require('express');
const socket = require('socket.io');
const routes = require('./routes/index.js');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');


var app = express();
var initChat = false;
var chats = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

module.exports = con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user"
});
  
con.connect( (err) => {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS mychat", (err, result) => {
    if (err) throw err;
    console.log("Database created");
    con.query("USE mychat", (err, result) => {if (err) throw err})
    con.query("CREATE TABLE IF NOT EXISTS chat" +
              "(id INTEGER NOT NULL AUTO_INCREMENT, user VARCHAR(32)," +
              " content VARCHAR(255), date VARCHAR(255))", (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
  });
});

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
        // console.log(data);
        con.query('INSERT INTO chat (id, user, content, date) VALUES' +
                     '(?, ?, ?, ?)', [1, data.handle, data.message, data.date]);
        chats.push(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    if (! initChat) {
        con.query('SELECT * FROM chat')
        .on('result', (data) => {
            chats.push(data);
            // console.log(chats);
        })
        .on('end', () => {
            socket.emit('initial chats', chats);
        });
        initChat = true;
    } else {
        socket.emit('initial chats', chats);
    }
});