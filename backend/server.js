var express = require('express');
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express();
var port = process.env.PORT || 8080

var db = require('./db');
db.connect();
db.query("CREATE DATABASE IF NOT EXISTS chat");
db.query("USE chat");

app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
  res.send('HI');
});

var user = require('./routes/User');
app.use('/user', user);

var msg = require('./routes/Msg');
app.use('/msg', msg);

var resetDB = require('./routes/ResetDB');
app.use('/resetdb', resetDB);

server = app.listen(port, function(){
  console.log('server is running on port ' + port);
});

var socket = require('socket.io');
io = socket(server);
var user_list = []

io.on('connection', (socket) => {
  const user_id = socket.handshake.query.user_id;
  user_list.push(user_id)
  io.emit('NEW_USER', {"user_list": user_list, "user_id": user_id});

  socket.on('SEND_MESSAGE', (data) => {
    const time = new Date();
    if(data.user_id.length < 50 && data.content.length < 255) {
      db.query("INSERT INTO log(user_id, content, time) VALUES (?,?,?)", [data.user_id, data.content, time.getHours()+':'+time.getMinutes()])
      io.emit('RECEIVE_MESSAGE', {"alert": false, "user_id": data.user_id, "content": data.content, "time": time.getHours()+':'+time.getMinutes()});
    }
  });

  socket.on('disconnect', () => {
    const idx = user_list.indexOf(user_id);
    user_list.splice(idx, 1);
    io.emit('OUT_USER', {"user_list": user_list, "user_id": user_id});
  });
});