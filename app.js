var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var routes = require('./routes/index');

var methodOverride = require('method-override');
// var users = require('./routes/users'); esta fue retirada

var session = require('express-session');
var app = express();

app.use(partials());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("Quiz 2015"));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('*',function(req,res,next){
	if(req.session.user){
			var tiempo_inactivo;
			req.session.t1 = req.session.t2 || new Date().getTime();
			req.session.t2 = new Date().getTime();

			tiempo_inactivo = req.session.t2 - req.session.t1;
			console.log("\n\n\n\n\nEste es el tiempo " + tiempo_inactivo/1000 + "\n\n\n\n");
		
		if(tiempo_inactivo > 120000){
				delete req.session.user;
				delete req.session.t2;
				delete req.session.t1;
			}
		
	}
		next();
		
});

app.use(function(req, res, next) {
    if(!req.path.match(/\/login|\/logout/)){
        req.session.redir = req.path;
    }
    // hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});



app.use('/', routes);
//app.use('/users', users); esta fue retirada
// control de session inactiva


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
