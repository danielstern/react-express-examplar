var React = require('react/addons');
var action = require('./../actions/GroceryItemActionCreator.jsx')

module.exports = React.createClass({
    getInitialState:function(){
        return {input:""};
    },
    handleInputName:function(e){
        this.setState({input : e.target.value});
    },
    addItem:function(e){
        e.preventDefault();
        //console.log("Adding item!",this.state.input);
        action.add({
            name:this.state.input
        });
        
        this.setState({
            input:''
        })
    },
    render:function(){
        return (
            <div className='grocery-addItem'>
                <form onSubmit={this.addItem}>
                    <input value={this.state.input} type='text' onChange={this.handleInputName}/>
                    <button> Add Item </button>
                </form>
            </div>
        )
    }
})