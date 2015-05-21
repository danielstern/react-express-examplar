"use strict";
let dispatcher = require("./../dispatcher.js");
var guid = require('guid');

function GroceryItemStore(){
	
	let groceryItems = [],
		changeListeners = [];
		
	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(groceryItems)	;
		})
	};
	
	$.ajax({
		url:"http://localhost:7777/items",
		dataType:"json",
		success:function(data){
			console.log("Got the data.",data);		
			while(data[0]){
				groceryItems.push(data.pop());
			}
			triggerListeners();
		}
	})
	
	
	
	function removeGroceryItem(item){
		var index = groceryItems.findIndex(x => x.id===item.id);
		groceryItems.splice(index,1);
		triggerListeners();
	}
	
	function getGroceryItems(){
		return groceryItems;
	};
	
	function onChange(listener){
		changeListeners.push(listener);		
	}
	
	dispatcher.register(function(event){
		var split = event.type.split(':');
		if (split[0]==='grocery-item'){
			switch(split[1]) {
				case "add":
					var item = event.payload;
					item.id = guid.raw();
					groceryItems.push(item);
					triggerListeners();
					break;
				case "delete":
					removeGroceryItem(event.payload);
					break;
			}
		}
	})
	
  
	return {
		getGroceryItems:getGroceryItems,
		onChange:onChange
	}
}

module.exports = new GroceryItemStore();