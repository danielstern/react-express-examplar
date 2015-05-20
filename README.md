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

## Store
A utility that listens for particular kind of dispatcher events and is responsible for the handling of one element.
For example, in an Address Book app, you would have a `Contacts` store.
Stores fire change events, allow consumers to listen for change events, and allows direct interaction with the elements in the store.
A contact store might, for example, have a function to add, edit or delete contacts that can be used by various components in your app.
Stores usually contain a local copy of the database or part of the database, to allow for instant response to user interaction. Stores will then negotiate the update with a long-term storage solution in a custom manner.