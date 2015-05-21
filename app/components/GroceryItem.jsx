var dispatcher = require("./../dispatcher.js");

module.exports = React.createClass({
	getInitialState:function(){
		return {
			purchased:this.props.purchased
		}
	},
	purchase:function(e){
		console.log("You bought me.");
		e.preventDefault();
		this.setState({
			purchased:true
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
					 {this.state.purchased ? "purchased" : ''}
				</div>
				<div>
					 {this.props.name}
				</div>
				<form onSubmit={this.purchase}>
					<button>Bought</button>
				</form>
				<form onSubmit={this.delete}>
					<button>Remove</button>
				</form>
			</div>
		)
	}
})