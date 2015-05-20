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

backend.listen('7777');