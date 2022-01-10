// 多异步之间的协作方案

const fs = require("fs");

var count = 0;
var results = {};
var done = function (key, value) {
  results[key] = value;
  count++;
  if (count === 3) {
    render(results);
  }
}

// 渲染页面
 function render(a) {
   console.log(a);
}

fs.readFile(template_path, 'utf8', function (err, template) {
  done('template', template);
})

db.query(sql, function (err, data) {
  data('data', data);
});

// 哨兵变量， 利用偏函数来处理哨兵变量和第三方函数的关系
var after = function (times, callback) {
  var count = 0, results = {};
  return function (key, value) {
    results[key] = value;
    count++;
    if (count === times) {
      callback(results);
    }
  }
}
var done = after(times, render);
zzvcom_3421
103054