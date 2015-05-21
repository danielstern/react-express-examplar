"use strict";

let Express = require('express');
let cors = require('cors');
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





let backend = new Express();
backend.use(cors());
backend.get('/',function(req,res){
	res.json({
		version:'version/',
		items:{
			root:'items',
			all:'/',
		}
	})
});

backend.get('version/',function(req,res){
	res.json('1.0.2')
});

backend.get('/items',function(req,res){
	GroceryItem.find(function(error,doc){
		res.send(doc);
	})
})
 
backend.listen(7777);



let frontend = new Express();
frontend.use(Express.static(__dirname + '/../.tmp'))
frontend.listen(80);