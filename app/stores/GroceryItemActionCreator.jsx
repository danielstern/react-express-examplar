var dispatcher = require("./../dispatcher.js");

module.exports = {
	add:function(name,cost){
		dispatcher.dispatch({
			type:"grocery-item:add",
			payload:{
				name: name,
				purchased: false
			}
		})
	},
	buy:function(id){
		dispatcher.dispatch({
			type:"grocery-item:buy",
			payload:{
				id:id
			}
		})
	},
	unbuy:function(id){
		dispatcher.dispatch({
			type:"grocery-item:unbuy",
			payload:{
				id:id
			}
		})
	},
	delete:function(id){
		dispatcher.dispatch({
			type:"grocery-item:delete",
			payload:({
				id:id
			})
		});		
	}

}