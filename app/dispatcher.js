var guid = require('guid');

var listeners = {};

var dispatcher = {
	register:function(callback){
		var id = guid.raw();
		listeners[id] = callback;
		return id;
	},
	dispatch:function(payload){
		for (var id in listeners){
			var listener = listeners[id];
			listener(payload);
		}	
	}
};
module.exports = dispatcher; 