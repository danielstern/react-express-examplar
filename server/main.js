"use strict";

let express = require('express');
let cors = require('cors');
let parser = require('body-parser');
let mongoose = require('mongoose');
let GroceryItem = require('./models/GroceryItem.js');


mongoose.connect('mongodb://localhost/grocery',function(){
	mongoose.connection.db.dropDatabase();

	[{name:"Ice Cream"},{name:"Waffles"}].forEach(function(item){
		new GroceryItem({
			name:item.name
		}).save();
	})
});


let app = new express();

app.use(cors())
.use(parser.urlencoded({ extended: false }))
.use(parser.json())


app.get('/api',function(req,res){
	res.json({
		version:'version/',
		items:{
			root:'items',
			all:'/',
		}
	})
})
.get('/api/version/',function(req,res){
	res.json('1.0.2')
})


app.route('/api/items')
.get(function(req,res){
	GroceryItem.find(function(error,doc){
		res.send(doc);
	})
})
.post(function(req,res){
	var groceryItem = new GroceryItem(req.body);
	groceryItem.save(function(err,data){
		if (err) {
			res.status(501).send();
		} else {
			res.status(200).send();
		}
	});
	;
});

app.route('/api/items/:id')
.get(function(req,res){
	GroceryItem.find({_id:req.params.id},function(error,doc){
		if (error){
			return res.status(404).send();
		}
		console.log("Found doc.",doc);
		res.status(200)
			.send(doc);
	})
})
.delete(function(req,res){
	GroceryItem.find({_id:req.params.id})
	.remove(function(){
	res.status(202)
		.send();
	})
})
.patch(function(req,res){
	GroceryItem.find({_id:req.params.id},function(error,doc){
		for (key in req.body){
			doc[key] = req.body[key];
		};
		
		doc.save(function(err){
			res.status(200).send();
		});
	})
})
	
app.use(express.static(__dirname + '/../.tmp'))
.listen(7777);