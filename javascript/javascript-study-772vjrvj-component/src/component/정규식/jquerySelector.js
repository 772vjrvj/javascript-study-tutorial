const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

const res1 = rquickExpr.exec( '<123@ab!>' );
console.log('res1 : ', res1);

const res2 = rquickExpr.exec( '#ab1A-_' );
console.log('res2 : ', res2);