var path = require('path');

// obtenemos la url para postgrade y sqlite
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = (url[6] || null);
var user        = (url[2] || null);
var pwd         = (url[3] || null);
var protocol    = (url[1] || null);
var dialect     = (url[1] || null);
var port        = (url[5] || null);
var host        = (url[4] || null);
var storage     = process.env.DATABASE_STORAGE;

// se carga el ORM
var Sequelize = require('sequelize');

// se utiliza la base de datos
var sequelize = new Sequelize(DB_name, user, pwd,
    { dialect: dialect,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,
      omitNull: true
    }
);

// importamos la definicion de la tabla QUiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// importamos la definicion de la tabla Comments en comments.js
var comment_path = path.join(__dirname, 'comments');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exportamos la definicion de la tabla
exports.Quiz = Quiz;
exports.Comment = Comment;
//exports.sequelize = sequelize; // exportamos sequelize para consultas estadisticas

// se crea e inicializa la tabla de preguntas
sequelize.sync().then(function () {
    // success ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { // se inicializa solo si esta vacia
            Quiz.create({
                pregunta: "¿Cual es la capital de Italia?",
                respuesta: "roma",
                tema: "humanidades"
            });
            Quiz.create({
                pregunta: "¿Cual es la capital de Portugal?",
                respuesta: "lisboa",
                tema: "humanidades"
            });
        }
    });
});