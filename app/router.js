var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize');
var cmdclr = require('../config/cmdclr');
var User = require('./models/user');

module.exports = function(app,app1) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app1.post('/insecure1', function(req, res) {
		var data = '';
		req.on( 'data', function( chunk ) {
			data += chunk;
		});
		req.on( 'end', function() {
			req.rawBody = data;
			if ( data && data.indexOf( '{' ) > -1 ) {
				req.body = JSON.parse( data );
			}
			console.log(req.body);
			User.find(req.body,function(error,result){
				if(error) throw error;
				if(result.length>0)
				res.send(result);
				else
				res.send('Invalid username or password!');
			});
		});
	});
	app1.post('/secure1', function(req, res) {
		var data = '';
		req.on( 'data', function( chunk ) {
			data += chunk;
		});
		req.on( 'end', function() {
			req.rawBody = data;
			if ( data && data.indexOf( '{' ) > -1 ) {
				req.body = JSON.parse( data );
			}
			console.log(req.body);
			console.log({username: {$in: [sanitize((req.body.username||"")).toString(10)]},password: {$in: [sanitize((req.body.password||"")).toString(10)]}});
			User.find({username: {$in: [sanitize((req.body.username||"")).toString(10)]},password: {$in: [sanitize((req.body.password||"")).toString(10)]}},function(error,result){
				if(error) throw error;
				if(result.length>0)
				res.send(result);
				else
				res.send('Invalid username or password!');
			});
		});
	});
	app.post('/insecure2', function(req, res) {
		console.log(req.body);
		User.find(req.body,function(error,result){
			if(error) throw error;
			if(result.length>0)
			res.send(result);
			else
			res.send('Invalid username or password!');
		});
	});
	app.post('/secure2', function(req, res) {
		console.log(req.body);
		console.log({username: {$in: [sanitize((req.body.username||"")).toString(10)]},password: {$in: [sanitize((req.body.password||"")).toString(10)]}});
		User.find({username: {$in: [sanitize((req.body.username||"")).toString(10)]},password: {$in: [sanitize((req.body.password||"")).toString(10)]}},function(error,result){
			if(error) throw error;
			if(result.length>0)
			res.send(result);
			else
			res.send('Invalid username or password!');
		});
	});
	app1.get('/insecure3', function(req, res) {
		console.log(req.query);
		User.find({username:req.query['username'],password:req.query['password']},function(error,result){
			if(error) throw error;
			if(result.length>0)
			res.send(result);
			else
			res.send('Invalid username or password!');
		});
	});
	app1.get('/secure3', function(req, res) {
		console.log(req.query);
		console.log({username: {$in: [sanitize((req.query['username']||"")).toString(10)]},password: {$in: [sanitize((req.query['password']||"")).toString(10)]}});
		User.find({username: {$in: [sanitize((req.query['username']||"")).toString(10)]},password: {$in: [sanitize((req.query['password']||"")).toString(10)]}},function(error,result){
			if(error) throw error;
			if(result.length>0)
			res.send(result);
			else
			res.send('Invalid username or password!');
		});
	});
	app.post('/register', function(req, res) {
		if(req.body.password==req.body.repassword) {
			var newUser = new User();
			newUser.email = req.body.email;
			newUser.fullname = req.body.fullname;
			newUser.username = req.body.username;
			newUser.password = req.body.password;
			newUser.usertype = 'user';
			newUser.save();
		}
		res.redirect('/#!/insecure1');
	});
	app1.post('/register', function(req, res) {
		if(req.body.password==req.body.repassword) {
			var newUser = new User();
			newUser.email = req.body.email;
			newUser.fullname = req.body.fullname;
			newUser.username = req.body.username;
			newUser.password = req.body.password;
			newUser.usertype = 'user';
			newUser.save();
		}
		res.redirect('/#!/insecure1');
	});
	app.get('*', function(req, res) {
		res.sendfile('./src/index.html');
	});
	app1.get('*', function(req, res) {
		res.sendfile('./src/index.html');
	});

};

function getParamData(query, param) {
	if(query.indexOf(param)<0)return null;
	query = query.substr(query.indexOf(param)+param.length+1);
	if(query.indexOf('&')>=0)
	query = query.substr(0,query.indexOf('&'));
	return query;
}
