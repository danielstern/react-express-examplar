let GroceryItemList = require('./GroceryItemList.jsx');
let React = require('react/addons');

module.exports = React.createClass({
	render:function(){
		return (
			<div>
				<h1>Grocery Listify</h1>
				<GroceryItemList/>
			</div>
		)
	}
});
