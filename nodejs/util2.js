var util = require('util');

Person = function() {
  this.name = 'Gabriel';
  this.toString = function() {
    return this.name;
  };
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj, true, null, true));
