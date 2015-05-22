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

app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

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
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

var itemsRouter = express.Router()
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

itemsRouter
.get('/:_id',function(req,res){
	GroceryItem.find({_id:req.params._id},function(error,doc){
		res.status(200)
			.send(doc);
	})
})
.delete('/:_id',function(req,res){
	GroceryItem.find({_id:req.params._id})
		.remove(function(){
		res.status(202)
			.send();
		})
})

app.use('/api/items',itemsRouter)