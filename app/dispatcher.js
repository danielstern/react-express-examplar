var guid = require('guid');

var listeners = {};

var dispatcher = {
	register:function(callback){
		var id = guid.raw();
		listeners[id] = callback;
		return id;
	},
	dispatch:function(payload){
		console.log("dispatching...",payload);
		for (id in listeners){
			listener = listeners[id];
			listener(payload);
		}	
	}
};
module.exports = dispatcher; 