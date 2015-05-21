"use strict";

let GroceryItem = require('./GroceryItem.jsx'),
	GroceryItemStore = require('./../stores/GroceryItemStore.jsx');
/*let GroceryItem = require('./components/GroceryItem.jsx');*/

module.exports = React.createClass({
	getInitialState:function(){
		return {
			items:GroceryItemStore.getGroceryItems()
		}
	},
	render:function(){
		return (
			<div>
				Grocery Items On Your List
				{this.state.items.map(function(item,index){
					return (
						<GroceryItem name={item.name} purchased={item.purchased} key={"item"+index} />		
					)
				})}
				
			</div>
		)
	}
})