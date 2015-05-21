var dispatcher = require("./../dispatcher.js");
var groceryAction = require("./../stores/GroceryItemActionCreator.jsx");

module.exports = React.createClass({

	togglePurchased:function(e){
		e.preventDefault();
		
		if (!this.props.item.purchased){
			groceryAction.buy(this.props.item);
		} else {
			groceryAction.unbuy(this.props.item);
		}		
	},
	delete:function(e){
		e.preventDefault();
		groceryAction.delete(this.props.item);
	},
	render:function(){
		return (
			<div>
				<div>
					 {this.props.item.purchased ? "purchased" : 'not purchased'}
				</div>
				<div>
					 {this.props.item.name}
				</div>
				<form onSubmit={this.togglePurchased}>
					<button>{this.props.item.purchased ? "cancel" : "buy"}</button>
				</form>
				<form onSubmit={this.delete}>
					<button>Remove</button>
				</form>
			</div>
		)
	}
})