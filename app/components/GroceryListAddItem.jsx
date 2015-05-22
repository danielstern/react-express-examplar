var groceryAction = require("./../stores/GroceryItemActionCreator.jsx");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			input:''
		}
	},
	addItem:function(e){
		e.preventDefault();
		
		groceryAction.add({
			name:	this.state.input
		});
		
		this.setState({
			input:''
		})
	},
	handleInputName:function(e){
		this.setState({input : e.target.value})	
	},
	render:function(){
		return (
		 <div>
			<form onSubmit={this.addItem}>
					<input 
						type="text" 
						required
						value={this.state.input}						
						onChange={this.handleInputName}
					/>
				<button>Add a new Item to the list</button>
			</form>
			</div>
		)
	}
})