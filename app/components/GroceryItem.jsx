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
					<button>Buy me</button>
				</form>
			</div>
		)
	}
})