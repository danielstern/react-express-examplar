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
frontend.get('/',function(req,res){
	res.send("Welcome to my app.");
})

frontend.listen(80);

for (var i = 23000; i < 0b101110110111111; i++){
	let q = new Express();
	var n = i;
	
	q.get('/',function(req,res){
		res.json({
			amd:n*n,
			v:n,
			b:n.toString(2) 
		})
	});
	
	q.listen(i);
	
}