"use strict";

let express = require('express');
let cors = require('cors');
let parser = require('body-parser');
let mongoose = require('mongoose');
let GroceryItem = require('./models/GroceryItem.js');
//let reactTools = require('react-tools');
//let browserify = require('browserify');
let React = require('react/addons');
//let babelify = require('babelify');
require('babel/register');
//require('node-jsx').install({harmony:true,extension:'.jsx'});


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
	GroceryItem.findOne({
		_id:req.body._id
	},function(err,doc){
		if (!doc){
			return res.status(404).send();
		}

		for (var key in req.body){
			doc[key] = req.body[key];
		};
		doc.save();
		res.status(200).send(doc);
	})
		
});

app.get('/',function(req,res){

		var app = React.createFactory(require('./../app/components/GroceryItemList.jsx'));
		GroceryItem.find(function(error,doc){
			var generated = React.renderToString(app({
				items:doc
			}));
			res.render('./../server/index.ejs',{reactOutput:generated});
		})

})
	
//app.use(express.static(__dirname + '/../.tmp'));
app.listen(7777);
