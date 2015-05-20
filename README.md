### Glossary

## Dispatcher
A simple emitter. Object register with the emitter to listen for an event, and when the event occurs, the objects are notified.
Something tells the dispatcher it wants to listen for an event with a command called `register` or `on`. 
Here is an example:
```javascript
    exampleDispatcher.on('app-start',function(){alert("Hello")});
    `setTimeout(function(){exampleDispatcher.emit('app-start')},1000);` // hello
```
The dispatcher's `on` or `register` function will either take two arguments, or take one argument and return a promise. The first argument is a string called the `type` of the listener. The `type` is basically the name of the event, like `sound-done` or `button-clicked`. The second argument, or the promise returned, is resolve every time the event occurs.
Note that some promise architectures do not allow promises to be resolved more than once. To avoid this confusion, it is recommended that you use a callback.
It is important to understand dispatcher are just a loose set of architecture rules and there are no hard and fast requirements.