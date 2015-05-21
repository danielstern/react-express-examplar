var dispatcher = require("./../dispatcher.js");

module.exports = React.createClass({
	getInitialState:function(){
		return {
			purchased:this.props.purchased
		}
	},
	togglePurchased:function(e){
		e.preventDefault();
		var state = this.state;
		this.setState({
			purchased: !state.purchased
		});
		
		dispatcher.dispatch({
			type:"grocery-item:" + (state.purchased ? "unbuy" : "buy"),
			payload:{
				name:this.props.name
			}
		})
	},
	delete:function(e){
		e.preventDefault();
		dispatcher.dispatch({
			type:"grocery-item:delete",
			payload:({
				name:this.props.name
			})
		});		
	},
	render:function(){
		return (
			<div>
				<div>
					 {this.state.purchased ? "purchased" : 'not purchased'}
				</div>
				<div>
					 {this.props.name}
				</div>
				<form onSubmit={this.togglePurchased}>
					<button>{this.state.purchased ? "cancel" : "buy"}</button>
				</form>
				<form onSubmit={this.delete}>
					<button>Remove</button>
				</form>
			</div>
		)
	}
})