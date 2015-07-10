var React = require('react/addons');
var GroceryItem = require('./GroceryItem.jsx');
var GroceryListAddItem = require('./GroceryListAddItem.jsx');

module.exports = React.createClass({
    render:function(){
        return (
            <div>
                <h1>Grocery Listify </h1>
                <div>
                    {this.props.items.map(function(item,index){
                        return (
                            <GroceryItem item={item} key={"item"+index}/>
                        )
                    })                       
                    }
                </div>
                <GroceryListAddItem />
            </div>
        )
    }
})