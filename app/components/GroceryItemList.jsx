"use strict";

let GroceryItem = require('./GroceryItem.jsx');
/*let GroceryItem = require('./components/GroceryItem.jsx');*/

module.exports = React.createClass({
	render:function(){
		return (
			<div>
				Grocery Items On Your List
				<GroceryItem name="Oats" />
			</div>
		)
	}
})