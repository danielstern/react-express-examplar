"use strict";

var Express = require('express');

let backend = new Express();

backend.get('/',function(req,res){
	res.json({
		version:'version/',
	})
});

backend.get('version/',function(req,res){
	res.json('1.0.2')
});

backend.listen(7777);

let frontend = new Express();
//frontend.get('/',function(req,res){
//	res.send("Welcome to my app.");
//})

frontend.use(Express.static(__dirname + '/../app'))

frontend.listen(80);