var express = require('express');
var path = require('path'); //had to add
var router = express.Router();

var mongoose = require('mongoose');
var Student = require('../models/Student.js');
var Employer = require('../models/Employer.js');


router.get('/api/students', function(req, res, next) {
  Student.find(function (err, students) {
    if (err) return next(err);
	res.json(students);
  });
});


router.get('/api/students/list', function(req, res, next) {
  Student.find(function (err, students) {
    if (err) return next(err);
    res.render('index', { title: 'Class List', students:students });
  });
});

router.get('/api/students/sorted', function(req, res, next) {
  Student.find({}).sort({'lname': 1}).exec(function (err, students) {
    if (err) return next(err);
    res.render('index', { title: 'Class List', students:students });
  });
});



router.get('/api/student/:id', function(req, res, next) {
 Student.findById(req.params.id, function (err, student) {
    if (err) return next(err);
   res.json(student);
  });
});



router.post('/', function(req, res, next) {
  Student.create('sample', function (err, post) {
    if (err) return next(err);
    //res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Student.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/api/employers', function(req, res, next) {
  Employer.find(function (err, employers) {
    if (err) return next(err);
	res.json(employers);
  });
});


module.exports = router;