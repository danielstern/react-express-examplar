"use strict";
let mongoose = require('mongoose');

let GroceryItemSchema = {
	name:String,
	id:String,
	cost:Number
};

let GroceryItem = mongoose.model('GroceryItem',GroceryItemSchema,'groceryItems');

module.exports = GroceryItem;