var events = require('events');
var EventEmitter = events.EventEmitter;

var dispatcher = new EventEmitter();

module.exports = dispatcher; 