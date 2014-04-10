var myModule1 = require('./module');

myModule1.setName('Gabriel 1');
//myModule.sayHello();

var myModule2 = require('./module');
myModule2.setName('Gabriel 2');

myModule1.sayHello();