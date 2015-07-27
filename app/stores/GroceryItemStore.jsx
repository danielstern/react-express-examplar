var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function GroceryItemStore(){
    //var items = [];
    var items = [];
    
    helper.get("api/items")
    .then(function(data){
        items = data;
        triggerListeners();
    })
    
    var listeners = [];
    
    function getItems(){
        return items;
    }
    
    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
        
        helper.post("api/items",item);
    }
    
    function deleteGroceryItem(item){
        var index;
        items.filter(function(_item, _index){
            if (_item.name == item.name) {
                index = _index;
            }
        });
        
        items.splice(index,1);
        triggerListeners();
    
    }
    
    function setGroceryItemBought(item, isBought){
        var _item = items.filter(function(a){ return a.name == item.name})[0];
        item.purchased = isBought || false;
        triggerListeners();
    }
    
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
		listeners.forEach(function(listener){
			listener(items)	;
		})
	};
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if (split[0]==='grocery-item'){
            switch(split[1]){
                case "add":
                    addGroceryItem(event.payload);
                    break;
                case "delete":
                    deleteGroceryItem(event.payload);
                    break;
                case "buy":
                    setGroceryItemBought(event.payload,true);
                    break;
                case "unbuy":
                    setGroceryItemBought(event.payload,false);
                    break;
            }
        }
    });
    
    return {
        getItems:getItems,
        onChange:onChange
    }
    
    

}

module.exports = new GroceryItemStore();