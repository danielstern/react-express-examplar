"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post} = require("./../RestHelper.js");

function GroceryItemStore(){
	
	let groceryItems = [],
		changeListeners = [];
		
	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(groceryItems)	;
		})
	};
	
	$.ajax({
		url:"api/items",
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
		var removed = groceryItems.splice(index,1)[0];
		triggerListeners();
		$.ajax({
			url:"api/items/"+item._id,
			type:'DELETE',
			error:function(){
				groceryItems.splice(index,0,removed);
				triggerListeners();
			}
		})
	}
	
	function addGroceryItem(item){
			groceryItems.push(item);
			triggerListeners();
			$.post("/api/items",item,function(data,status){
				console.log("Add complete",data,status);
			})
	}
	
	function setGroceryItemBought(item, isPurchased){
		var item = groceryItems.find(function(i){return i._id===item._id});
		item.purchased = isPurchased || false;;
		triggerListeners();
		
		$.ajax({
			url:"api/items/"+item._id,
			type:'PATCH',
			data:item
		})
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
