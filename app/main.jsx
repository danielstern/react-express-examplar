"use strict";

let dispatcher = require('./dispatcher.js');
let GroceryItemList = require('./components/GroceryItemList.jsx');
let React = require('react/addons');
let GroceryItemStore = require('./stores/GroceryItemStore.jsx');

var items = GroceryItemStore.getGroceryItems();
//render();
GroceryItemStore.onChange(()=>{
	items = GroceryItemStore.getGroceryItems();
	render();
})
function render(){
//	if (items.length>=1){
		React.render(<GroceryItemList items={items}/>,mount);
//	}
}
