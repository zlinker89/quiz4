var express = require('express');
var router = express.Router();
var quizController = require("../controllers/quiz_controller");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// autoload
router.param("quizId", quizController.load);
/* quizes */
router.get("/quizes", quizController.index);
router.get("/quizes/:quizId(\\d+)", quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", quizController.answer);

/* lib/creditos*/
router.get('/author', function (req, res) {
    res.render("lib/creditos");
});

/* New */
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

/* edit */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);

/* delete */
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
module.exports = router;