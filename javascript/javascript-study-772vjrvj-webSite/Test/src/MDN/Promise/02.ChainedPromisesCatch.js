const myPromise = new Promise((resolve, reject) => {
  reject('error');
});

myPromise
  .then(handleResolvedA)
  .then(handleResolvedB)
  .then(handleResolvedC)
  .catch(handleRejectedAny)
  // .then(handleResolvedA)


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

function handleRejectedAny(err){
  console.log('err :', err);
  return err
}
