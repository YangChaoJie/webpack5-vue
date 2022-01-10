/**
 * 调用setTimeOut() 或者setInterval() 创建的定时器会被插入到定时器观察者内部的一个红黑树中。 每次Tick 执行时，会从改红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，它的回调函数立即执行。
 */

/**
 * 
 */
setTimeout(() => {
  console.log('hjahah');
}, 0);

// process.nextTick = function (callback) {
  
// }
/**
 * 每次调用process.nextTick() 方法，只会将回调函数放入队列中，在下一次Tick 时取出执行。定时器中采用红黑树的操作时间为o(lg(n)), nextTick() 的时间复杂度的o(1).相较之下，process.nextTick() 更高效
 */
// setTimediate() 方法与process.nextTick() 方法类似，都是将回调函数延迟执行。

/**
 * process.nextTick() 属于idle 观察者， setTimediate() 属于check 观察者。在每一轮循环检查中， idle 是先于I/O 观察者，I/O 观察者先于check 观察者。
 */

process.nextTick(function () {
  console.log('nextTick 延迟执行1');
})

process.nextTick(function () {
  console.log('nextTick 延迟执行2');
})

setImmediate(function () {
  console.log('setImmediate 延迟执行1');
  process.nextTick(function () {
    console.log('强势插入');
  })
})

setImmediate(function () {
  console.log('setImmediate 延迟执行2');
  process.nextTick(function () {
    console.log('强势插入2');
  })
})

console.log('正常执行', !undefined); 
// 可以看出，当第一个setImmediate回调函数执行后， 并没有立即执行第二个，而是进入了下一个循环.