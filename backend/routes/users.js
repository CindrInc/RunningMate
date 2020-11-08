var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

// get list of friends for user username
router.get('/:username/friends', function (req, res, next) {
  dbConn.query('SELECT name2 FROM Friends WHERE name1 = ?', req.params.username, function (err, rows) {
    if (err) {
      res.json({'mates': []})
    } else {
      res.json({'mates': rows });
    }
  });
});

router.post('/:username/add_friend', function (req, res, next) {
  let name1 = req.params.username;
  let name2 = req.body.friend;
  var d1 = { name1, name2 };
  var d2 = { name1: name2, name2: name1 };
  dbConn.query('INSERT INTO Friends SET ?', d1, function (err, result) {
    if (err) {
      res.json({'success': false, 'error': err});
    } else {
      dbConn.query('INSERT INTO Friends SET ?', d2, function (err, result) {
        if (err) {
          res.json({'success': false, 'error': err});
        } else {
          res.json({'success': true});
        }
      }) 
    }
  });
});

// add a new book
router.post('/new', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  var form_data = { username, password }
  dbConn.query('INSERT INTO Users SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
      res.json({'success': false, 'error': err});
    } else {
      res.json({'success': true});
    }
  })
});

// // display edit book page
// router.get('/edit/(:id)', function (req, res, next) {

//   let id = req.params.id;

//   dbConn.query('SELECT * FROM books WHERE id = ' + id, function (err, rows, fields) {
//     if (err) throw err

//     // if user not found
//     if (rows.length <= 0) {
//       req.flash('error', 'Book not found with id = ' + id)
//       res.redirect('/books')
//     }
//     // if book found
//     else {
//       // render to edit.ejs
//       res.render('books/edit', {
//         title: 'Edit Book',
//         id: rows[0].id,
//         name: rows[0].name,
//         author: rows[0].author
//       })
//     }
//   })
// })

// // update book data
// router.post('/update/:id', function (req, res, next) {

//   let id = req.params.id;
//   let name = req.body.name;
//   let author = req.body.author;
//   let errors = false;

//   if (name.length === 0 || author.length === 0) {
//     errors = true;

//     // set flash message
//     req.flash('error', "Please enter name and author");
//     // render to add.ejs with flash message
//     res.render('books/edit', {
//       id: req.params.id,
//       name: name,
//       author: author
//     })
//   }

//   // if no error
//   if (!errors) {

//     var form_data = {
//       name: name,
//       author: author
//     }
//     // update query
//     dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function (err, result) {
//       //if(err) throw err
//       if (err) {
//         // set flash message
//         req.flash('error', err)
//         // render to edit.ejs
//         res.render('books/edit', {
//           id: req.params.id,
//           name: form_data.name,
//           author: form_data.author
//         })
//       } else {
//         req.flash('success', 'Book successfully updated');
//         res.redirect('/books');
//       }
//     })
//   }
// })

// // delete book
// router.get('/delete/(:id)', function (req, res, next) {

//   let id = req.params.id;

//   dbConn.query('DELETE FROM books WHERE id = ' + id, function (err, result) {
//     //if(err) throw err
//     if (err) {
//       // set flash message
//       req.flash('error', err)
//       // redirect to books page
//       res.redirect('/books')
//     } else {
//       // set flash message
//       req.flash('success', 'Book successfully deleted! ID = ' + id)
//       // redirect to books page
//       res.redirect('/books')
//     }
//   })
// })

module.exports = router;