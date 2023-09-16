// var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// var regexp = /[A-E]/gi;

var str = "10,10,10,10,20,30,40,50";
var regexp = /([^,]+)(,\1)*(,|$)/gi;



var matches_array = str.match(regexp);
console.log('matches_array : ', matches_array);


