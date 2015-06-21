var express = require('express');

var models = require('../models/models.js');


// autoload
exports.load = function(req,res,next,quizId){
    models.Quiz.find(quizId).then(function(quiz){
        if(quiz){
            req.quiz = quiz;
            next();
        }else{
            next(new Error("No existe el quizId=" + quizId));
        }
    }).catch(function(error){next(error);});
}

// GET quizes/:id
exports.show = function (req, res) {
   res.render('quizes/show', { quiz: req.quiz, errors: [] });
}

// GEt quizes/:id/answer
exports.answer = function (req, res) {
        if (req.query.respuesta.toLowerCase() === req.quiz.respuesta) {
                res.render("quizes/answer", { respuesta: "correcto", quiz: req.quiz, errors: [] });
            } else {
                res.render("quizes/answer", { respuesta: "incorrecto", quiz: req.quiz, errors: []  });
            }
    
}

// GET quizes
exports.index = function (req, res) {
    var search = req.query.search;
    if(search !== undefined){
        search = "%" + search + "%"; // para el inicio y fin :)
        models.Quiz.findAll({where: ["pregunta like ?", search.replace(" ","%")]}).then(function(quizes){
             res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
        });
    }else{
        models.Quiz.findAll().then(function (quizes) {
        res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
    }).catch(function(error){next(error);});
    }
}

// get new
exports.new = function(req,res){
    var quiz = models.Quiz.build(
    {pregunta: "pregunta", respuesta: "respuesta", tema: "tema"}
    );
    res.render("quizes/new", {quiz: quiz, errors: []});
}

// post create
exports.create = function(req,res){
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(function(err){
        if(err){
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
        }else{
            // guarda en DB  los campos pregunta respuesta
            quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
                res.redirect("/quizes");
            });
        }
    });
    
};


// put
exports.edit = function(req,res){
    var quiz = req.quiz; // autoload instancia
    res.render('quizes/edit',{quiz:quiz, errors: []} );
}

exports.update = function(req,res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz.validate().then(function(err){
        if(err){
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        }else{
            // guarda en DB  los campos pregunta respuesta
            req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
                res.redirect("/quizes");
            });
        }
    });
}

// delete
exports.destroy = function(req, res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error);});
}