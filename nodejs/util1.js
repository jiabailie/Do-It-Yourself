// util1.js

var util = require('util');

function Base() {
  this.name = 'base';
  this.base = 1;

  this.sayHello = function() {
    console.log('Hello ' + this.name);
  };
}

Base.prototype.showName = function() {
  console.log(this.name);
};

Sub = function() {
  this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
console.log(objSub);
