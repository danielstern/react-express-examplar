"use strict";

let Express = require('express');
let cors = require('cors');
let parser = require('body-parser');
let mongoose = require('mongoose');

let groceryItemSchema = {
	name:String,
	id:String,
	cost:Number
};


let GroceryItem = mongoose.model('GroceryItem',groceryItemSchema,'groceryItems');

mongoose.connect('mongodb://localhost/grocery',function(){
	mongoose.connection.db.dropDatabase();

	[{name:"Ice Cream"},{name:"Waffles"}].forEach(function(item){
		new GroceryItem({
			name:item.name
		}).save();
	})
});


let app = new Express();

app.use(cors());
app.use(parser.json());
app.get('api/',function(req,res){
	res.json({
		version:'version/',
		items:{
			root:'items',
			all:'/',
		}
	})
})
.get('version/',function(req,res){
	res.json('1.0.2')
})
.use(Express.static(__dirname + '/../.tmp'))
.listen(7777)

app.route('/items')
.get(function(req,res){
	GroceryItem.find(function(error,doc){
		res.send(doc);
	})
})
.post(function(req,res){
	var groceryItem = new GroceryItem(req.body);
})


app.route('/items/:_id')
.get(function(req,res){
	GroceryItem.find({_id:req.params._id},function(error,doc){
		res.status(200)
			.send(doc);
	})
})
.delete(function(req,res){
	GroceryItem.find({_id:req.params._id})
		.remove(function(){
		res.status(202)
			.send();
		})
})
