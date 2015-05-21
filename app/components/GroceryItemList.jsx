"use strict";

let GroceryItem = require('./GroceryItem.jsx');
/*let GroceryItem = require('./components/GroceryItem.jsx');*/

module.exports = React.createClass({
	getInitialState:function(){
		return {
			items:[{
				name:"Oats",
				purchased:false,
				price:3.00,				
			},{
				name:"Milk",
				purchased:true,
				price:7.00,				
			}]
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