// 1. Arrow Expressions (箭头表达式)
console.log(() => console.log('hello word')); // [Function (anonymous)] 输出匿名表达式

const helloWorld = (name) => {
  console.log(`Welcome ${name}, this is an  arrorw express` );
}

helloWorld('张三') // Welcome 张三, this is an  arrorw express

// 2. Asynchronous Concepts (异步的概念)
const testLuck = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('LL winner')
  } else {
    reject(new Error('Unluncky!'))
  }
})

testLuck.then(message => {
  console.log(message);
}).catch(error => {
  console.error(error);
})

// Async/Await
const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('All done!'))
})

const asyncFunction = async () => {
  const finalResult = await newPromise
  console.log(finalResult);
}

asyncFunction()

const showAlert = () => {
  // Calling setInterval() and passing a function that shows an alert every 5 seconds.
  setInterval(() => {
    console.log('I show every 5 seconds!')
  }, 5000);
};
 
// Calling the newInterval() function that calls the setInterval
showAlert();

// Defining a function that calls setTimeout 只执行一次
const showTimeout = () => {
  // Calling setTimeout() that passes a function that shows an alert after 5 seconds.
  setTimeout(() => {
    console.log('I only show once after 5 seconds!');
  }, 5000);
};
 
// Calling the showTimeout() function
showTimeout();