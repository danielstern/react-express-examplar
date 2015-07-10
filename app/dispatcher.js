var guid = require('guid');
var listeners = {};

module.exports = {
    register:function(cb){
        var id = guid.raw();
        listeners[id] = cb;
        return id;
    },
    dispatch:function(payload){
        console.info("Dispatching...",payload);
        for (var id in listeners){
            var listener = listeners[id];
            listener(payload);
        }
    }
}