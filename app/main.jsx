"use strict";

let dispatcher = require('./dispatcher.js');

let GroceryItemList = require('./components/GroceryItemList.jsx');

var GroceryListApp = React.createClass({
	render:function(){
		return (
			<div>
				<h1>Grocery Listify</h1>
				<GroceryItemList/>
			</div>
		)
	}
});

React.render(<GroceryListApp/>,mount);