"use strict";

let dispatcher = require('./dispatcher.js');

var GroceryListApp = React.createClass({
	render:function(){
		return (
			<div>
				<h1>Grocery Listify</h1>
			</div>
		)
	}
});

React.render(mount,<GroceryListApp/>)