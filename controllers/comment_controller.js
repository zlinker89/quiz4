var express = require('express');

var models = require('../models/models.js');

// new
exports.new = function(req,res){
    res.render('comments/new.ejs', {quizid: req.params.quizId, errors: [] });
}

// create
exports.create = function(req,res){
    var comment = models.Comment.build({texto: req.body.comment.texto, QuizId: req.params.quizId});

    comment.validate().then(function(err){
        if(err){
            res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
        }else{
            comment.save().then(function(){
                res.redirect('/quizes/'+ req.params.quizId)
            });
        }
    }).catch(function(error){next(error);});



}