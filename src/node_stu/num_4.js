/**
 * 偏函数用法
 * @param {} type 
 * @returns 
 */
var isType = function type(type) {
  return function (obj) {
    console.log('obj----', obj);
    return toString.call(obj) == '[object ' + type + ']'
  }
}

var isString = isType('String')
var isFunction = isType('Function')
console.log(isString('abc'));