"use strict";
let dispatcher = require("./../dispatcher.js");

function GroceryItemStore(){
	
	let groceryItems = [{
			name:"Oats",
			purchased:false,
			price:3.00,				
		},{
			name:"Milk",
			purchased:true,
			price:7.00,				
		},{
			name:"Bread",
			purchased:false,
			price:2.00,				
		}],
		changeListeners = [];
		
	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(groceryItems)	;
		})
	};
	
	function removeGroceryItem(item){
		var index = groceryItems.findIndex(x => x.name===item.name);
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
					groceryItems.push(event.payload);
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