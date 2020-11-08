var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

router.get('/:username', function(req, res, next) {
  dbConn.query('SELECT name2, distance, date FROM Friends WHERE name1 = ?', req.params.username, function (err, rows) {
    if (err) {
      res.json({'runs': []})
    } else {
      res.json({'runs': rows });
    }
  });
});

router.post('/new', function (req, res, next) {
  let name1 = req.body.name1;
  let name2 = req.body.name2;
  let distance = parseInt(req.body.distance);
  let ddd = new Date(req.body.date);
  var d1 = { name1, name2, distance };
  d1.date = new Date(ddd);
  var d2 = { name1: name2, name2: name1, distance: distance, date: d1.date };
  dbConn.query('INSERT INTO Runs SET ?', d1, function (err, result) {
    if (err) {
      res.json({'success': false, 'error': err});
    } else {
      dbConn.query('INSERT INTO Runs SET ?', d2, function (err, result) {
        if (err) {
          res.json({'success': false, 'error': err});
        } else {
          res.json({'success': true});
        }
      }) 
    }
  });
});

module.exports = router;
