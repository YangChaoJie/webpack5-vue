// node modules events, error、buffer, fs, timer
const events = require('events');
const fs = require('fs');
// EventEmitter object is used to assign listener functions triggered on specific events
let myEmitter = new events.EventEmitter();
let newWelcomeMessage = (data) => {
  console.log('welcome node js', data);
};
myEmitter.on('welcome', newWelcomeMessage);
myEmitter.emit('welcome', 'Codey');

// Buffer objects are uses to handle binary data
const buffer = Buffer.from('hello world');
console.log(buffer);
console.log(buffer.toString());


// let readDataCallback = (err, data) => {
//   if (err) {
//     console.log(`Something went wrong: ${err}`);
//   } else {
//     console.log(`Provided file contained: ${data}`);
//   }
// };

// file.txt file is loaded using the readFile method of the fs module
// fs.readFile('./file.txt', 'utf-8', readDataCallback);

// The timer module provides the setImmediate() function which runs immediately after the current poll phase is completed. Take note of when 'Welcome to Node.js' is logged to the terminal.
setImmediate(() => {
  console.log('hahaha welcome node');
})


for (var i = 0; i < 10; i++) {
  setTimeout(function () {
      console.log(new Date());
  }, 2000*(i+1));
}