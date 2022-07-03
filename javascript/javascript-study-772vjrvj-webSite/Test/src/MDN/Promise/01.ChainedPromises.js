const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);


function handleResolvedA(resol){
  console.log('handleResolvedA');
  console.log('resolve :', resol);
  return resol + 'A';
}

function handleResolvedB(resol){
  console.log('handleResolvedB');
  console.log('resolve :', resol);
  return resol + 'B';
}

function handleResolvedC(resol){
  console.log('handleResolvedC');
  console.log('reject :', resol);
  return resol + 'C';
}

function handleRejectedA(rejec){
  console.log('handleRejectedA');
  console.log('reject :', rejec);
  return rejec + 'A';
}

function handleRejectedB(rejec){
  console.log('handleRejectedB');
  console.log('reject :', rejec);
  return rejec + 'B';
}

function handleRejectedC(rejec){
  console.log('handleRejectedC');
  console.log('reject :', rejec);
  return rejec + 'C';
}
