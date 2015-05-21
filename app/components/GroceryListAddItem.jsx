module.exports = React.createClass({
	getInitialState: function(){
		return {
			input:''
		}
	},
	addItem:function(e){
		e.preventDefault();
		console.log("Adding item...",this.state.input);
		
	},
	handleInputName:function(e){
		this.setState({input : e.target.value})	
	},
	render:function(){
		return (
		 <div>
			<form onSubmit={this.addItem}>
				<label>
					Item Name
					<input 
						type="text" 
						value={this.state.input}						
						onChange={this.handleInputName}
					/>
				</label>
				<button>Add a new Item to the list</button>
			</form>
			</div>
		)
	}
})