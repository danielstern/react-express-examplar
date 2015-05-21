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
			while(data[0]){
				groceryItems.push(data.pop());
			}
			triggerListeners();
		}
	})	
	
	function removeGroceryItem(item){
		var index = groceryItems.findIndex(x => x._id===item._id);
		groceryItems.splice(index,1);
		triggerListeners();
	}
	
	function addGroceryItem(item){
			item.id = guid.raw();
			groceryItems.push(item);
			triggerListeners();
			$.post("http://localhost:7777/items",item,function(data,status){
				console.log("Add complete",data,status);
			})
	}
	
	function setGroceryItemBought(item, isPurchased){
		//debugger;
		groceryItems.find(function(i){return i._id===item._id})
			.purchased = isPurchased || false;;
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
					addGroceryItem(event.payload);
					break;
				case "delete":
					removeGroceryItem(event.payload);
					break;
				case "buy":
					setGroceryItemBought(event.payload, true);
					break;
				case "unbuy":
					setGroceryItemBought(event.payload, false);
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