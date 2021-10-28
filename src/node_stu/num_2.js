// REPL是read-eval-print循环的缩写。它是一个通过三种不同状态循环或重复循环的程序:read状态，程序从用户那里读取输入，eval状态，程序计算用户的输入，以及打印状态，程序将其计算输出到控制台。然后它再次循环这些状态。
// 当您安装Node时，它带有一个内置的JavaScript REPL。您可以通过在终端中输入命令节点(后面不带任何内容)并按回车键来访问REPL。一个比;字符将显示在终端中，表明REPL正在运行并提示输入。Node REPL将逐行计算输入。
// 默认情况下，当您按下enter键时，您将指示输入已准备好进行eval。如果您想输入多行代码，然后一次对它们进行计算，那么您可以在REPL中输入.editor。一旦进入“编辑器”模式，当你准备好要计算输入值时，你可以键入control + d。REPL的每个会话都有一个共享内存;您可以访问您定义的任何变量或函数，直到您退出REPL。
// global 是node 的 对象。  类似于浏览器上面的window
// require('module').builtinModules 显示 node有许多模块已经构建到Node.js中，并准备被利用!
const os = require('os');
const server = {};
server.type = os.type();
server.architecture = os.arch();
server.uptime = os.uptime;
console.log(server);

// =================================
// Require in trails module from trails.js
const trails = require('./trails.js');
// Require in util module here
const util = require('util');
// Simulate database call to search trails module for specified trail
const getTrailDistance = (trail, callback) => {
  return setTimeout(() => {
    if (trails.hasOwnProperty(trail)) {    
      const foundTrail = trails[trail];    
      callback(null, foundTrail)
    } else {
      callback(new Error('Trail not found!'))
    }
  }, 1000);
}

// Callback function to send an error in the case of an error, or to handle trail data if a trail was found successfully.
function callback (error, trailData) {
  if (error) {
    console.error(error.message)
    process.exit(1)
  } else {
    const mi = trailData.miles;   
    const nickname = trailData.nickname;
    console.log(`The ${nickname} is ${mi} miles long!`)
  }
}

getTrailDistance('North Country', callback)

// Promisfy below!
const getTrailDistancePromise = util.promisify(getTrailDistance);
getTrailDistancePromise('North Country').then((foundTrail) => {
      const nickname = foundTrail.nickname;
    const mi = foundTrail.miles; 
    console.log(`The ${nickname} is ${mi} miles long!`);
}).catch((error) => {
  console.log(error)
})
