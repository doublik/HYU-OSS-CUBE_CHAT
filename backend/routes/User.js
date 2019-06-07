var express = require('express');
var User = express.Router();
var db = require('../db');
var cors = require('cors');

User.use(cors())

User.post('/regist', (req, res) => {
  const data = {
    id: req.body.userID,
    pw: req.body.userPW,
    repw: req.body.userRePW
  }
  if(data.id && data.pw && data.pw === data.repw) {
    db.query("SELECT * FROM user WHERE user_id=?", [data.id], function(err, results, fields) {
      if(results.length == 0) {
        db.query("INSERT INTO user (user_id, user_pw) VALUES(?,?)", [data.id, data.pw], function(err, results, fields) {
          if(!err) {
            res.send('success');
          } else {
            res.send('err : ' + err);
          }
        });
      } else {
        res.send('fail');
      }
    });
  }
  console.log('regist');
});

User.post('/login', (req, res) => {
  const data = {
    id: req.body.userID,
    pw: req.body.userPW,
  }
  if(data.id && data.pw) {
    db.query("SELECT * FROM user WHERE user_id=? AND user_pw=?", [data.id, data.pw], function(err, results, fields) {
      console.log(results);
      if(results.length > 0) {
        res.send(data.id); // use token
      }
      /*if(!err) {
        res.send('success');
      } else {
        res.send('err : ' + err);
      }*/
    });
  }
});

module.exports = User;