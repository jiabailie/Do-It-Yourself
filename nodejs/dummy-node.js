var Dummy = require('./dummy');
var kenny = new Dummy();
var dinner = kenny.cooking(fried_chix);
dinner.on('cooked', function(chicken) {
  console.log('eat it up.');
});
