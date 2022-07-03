let class2type = {};
const toString = class2type.toString;
const typeArr = "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " );

typeArr.forEach((elem ,idx) => {
  class2type[ "[object " + elem + "]" ] = elem.toLowerCase();
});

function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

function isNumeric( obj ) {
	var type = toType( obj );
	return ( type === "number" || type === "string" ) &&
		!isNaN( obj - parseFloat( obj ) );
};