module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "-> Falta Pregunta"}}
         },
        respuesta: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "-> Falta Respuesta"}}
         },
        tema: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "-> Falta Tema"}} // esto esta de mas debido a que se controla por combo box :)
         }
    });
}