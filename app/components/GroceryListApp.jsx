let GroceryItemList = require('./GroceryItemList.jsx');
let React = require('react/addons');
let GroceryItemStore = require('./../stores/GroceryItemStore.jsx');

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
				<h1>Grocery Listify</h1>
				<GroceryItemList items={this.state.items}/>
			</div>
		)
	}
});
