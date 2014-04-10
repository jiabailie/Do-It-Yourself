display = function(arr) {
  var i = 0;
  console.log('Display an array:');
  for(i = 0; i < arr.length; ++i) {
    console.log(arr[i]);
  }
}
var i = 0, j = 0;
var d = new Array(1, 3, 2, 5, 4, 8, 9);
display(d);
for(i = 0; i < d.length; ++i) {
  for(j = i; j > 0; --j) {
    if(d[j - 1] > d[j]) {
      var tmp = d[j - 1];
      d[j - 1] = d[j];
      d[j] = tmp;
    }
  }
}
display(d);
