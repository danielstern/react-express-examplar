"use strict";

let GroceryItem = require('./GroceryItem.jsx'),
	GroceryListAddItem = require('./GroceryListAddItem.jsx'),
	React = require('react/addons'),
	GroceryItemStore = require('./../stores/GroceryItemStore.jsx');

module.exports = React.createClass({
	getInitialState:function(){
		return {
			items:GroceryItemStore.getGroceryItems()
		}
	},
	componentDidMount:function(){
		GroceryItemStore.onChange(()=>{
			this.setState({items:GroceryItemStore.getGroceryItems()})
		})
	},
	render:function(){
		return (
			<div>
				Grocery Items On Your List
				{this.state.items.map((item,index)=>{
					return (
						<GroceryItem item={item} key={"item"+index} />		
					)
				})}
				<GroceryListAddItem />
			</div>
		)
	}
})
