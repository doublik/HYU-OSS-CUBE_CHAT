var express = require('express');
var ResetDB = express.Router();
var db = require('../db');

ResetDB.get('/1', (req, res) => {
  var sql = "CREATE TABLE IF NOT EXISTS user (user_id VARCHAR(50), user_pw VARCHAR(50), PRIMARY KEY(user_id))";
  db.query(sql);
  sql = "CREATE TABLE IF NOT EXISTS log (id int AUTO_INCREMENT, user_id VARCHAR(50), content VARCHAR(255), time VARCHAR(10), PRIMARY KEY(id))";
  db.query(sql);
  sql = "INSERT INTO user (user_id, user_pw) VALUES('root', 'root')"
  db.query(sql);
  res.send('success');
})
ResetDB.get('/2', (req, res) => {
  db.query("DROP TABLE user, log");
  var sql = "CREATE TABLE user (user_id VARCHAR(50), user_pw VARCHAR(50), PRIMARY KEY(user_id))";
  db.query(sql);
  sql = "CREATE TABLE log (id int AUTO_INCREMENT, user_id VARCHAR(50), content VARCHAR(255), time VARCHAR(10), PRIMARY KEY(id))";
  db.query(sql);
  sql = "INSERT INTO user (user_id, user_pw) VALUES('root', 'root')"
  db.query(sql);
  res.send('success');
})

module.exports = ResetDB;