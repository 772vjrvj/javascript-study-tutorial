const myExecutorFunc = (resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);};


const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);

function handleFulfilled1(result){
  console.log('handleFulfilled1 result : ', result);
}

function handleFulfilled2(result){
  console.log('handleFulfilled2 result : ', result);
}

function handleRejected1(){

}

function handleRejected2(){

}
