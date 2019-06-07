var express = require('express');
var Msg = express.Router();
var db = require('../db');
var cors = require('cors');

Msg.use(cors())
Msg.get('', (req, res) => {
  db.query('SELECT * FROM log', function (err, results, fields) {
    if(!err) {
      res.send(results);
    }
  })
})

module.exports = Msg;