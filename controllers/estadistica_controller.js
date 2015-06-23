var express = require('express');
var models = require('../models/models.js');

exports.index = function(req,res,next){
	models.Quiz.count().then(function(c1) {
		//console.log("\n\n\n\n cantidad " + c1 + "\n\n\n\n\n\n")
		models.Comment.count().then(function(c2){

			models.Comment.findAll().then(function(comment){
					models.Quiz.findAll().then(function(quiz){
					
					// si mucho coste algoritmico :)

					var c_comentario = 0, s_comentario = quiz.length;
					var pregunta_comentario = [];

					// hallar la cantidad de preguntas sin comentar
					for (var i = 0; i < comment.length; i++) {
						 for (var j = 0; j < quiz.length; j++) {
						 	
						 	//console.log(comment[i].QuizId + " ----- " + quiz[j].id + "----------" + pregunta_comentario+ "\n");
							 if(pregunta_comentario.indexOf(quiz[j].id) === -1){
							 	if (comment[i].QuizId === quiz[j].id) {
							 		

							 			s_comentario -= 1;
							 		pregunta_comentario.push(quiz[j].id);

									
							 	}
							 }
							 // hallamos la cantidad con comentarios
									c_comentario = pregunta_comentario.length;
						};
					};



					//  renderizo
					res.render('quizes/estadisticas/index.ejs', {cantidad_pregunta: c1, cantidad_comentario: c2, 
					Numero_medio: c2/c1, pregunta_sin_comentario: s_comentario, pregunta_con_comentario: c_comentario ,errors: []});
				});
			});


			
		});




	    	
	  });
}