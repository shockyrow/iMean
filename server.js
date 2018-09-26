// modules =================================================
var express        = require('express');
var app            = express();
var app1           = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var config = {
  cmdclr    : require('./config/cmdclr'),
  db        : require('./config/db'),
  port      : process.env.PORT || 4445
};

// database configuration
console.log(config.db.getConnUrl());
mongoose.connect(config.db.getConnUrl(), { useMongoClient: true });
var db = mongoose.connection;

db.on('error',function(err){
  console.log(config.cmdclr.FgRed,'Error while connecting to the database!');
  throw err;
});
db.on('connect', function(){
  console.log(config.cmdclr.FgGreen,'Successfully connected to the database!');
});

// app configuration =======================================
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(express.static(__dirname + '/src')); // set the static files location /src/img will be /img for users
app1.use(express.static(__dirname + '/src')); // set the static files location /src/img will be /img for users

// router configuration =====================================
require('./app/router')(app,app1); // pass our application into our routes

// start app ===============================================
app.listen(config.port);
app1.listen(config.port+1);
console.log(config.cmdclr.FgYellow,'iMean started on port ' + config.port);
console.log(config.cmdclr.FgYellow,'http://localhost:' + config.port);

exports = module.exports = app; // expose app
