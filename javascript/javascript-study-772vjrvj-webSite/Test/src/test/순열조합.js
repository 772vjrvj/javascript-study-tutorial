//https://jun-choi-4928.medium.com/javascript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-21df4b536349



//조합


function arrNComFnSub(ord, mainArr, surIdx, eleArr, result){

  for (let idx = surIdx+1; idx < mainArr.length; idx++) {

    const ele = mainArr[idx];
    const nextArr = [...eleArr, ele];

    if(ord === 1){

      result.push(nextArr);

    }else{

      arrNComFnSub(ord-1, mainArr, idx, nextArr, result);

    }

  }
  return result;

}

// console.log('C: ', arrNComFnSub(2,[1,2,3,4,5], -1, [], []));


//순열


function arrNPFnSub(ord, mainArr, eleArr, result){

  for (let idx = 0; idx < mainArr.length; idx++) {

    const ele = mainArr[idx];
    if(eleArr.length != 0 && eleArr.indexOf(ele)>-1){
      continue;
    }

    const nextArr = [...eleArr, ele];

    if(ord === 1){

      result.push(nextArr);

    }else{

      arrNPFnSub(ord-1, mainArr, nextArr, result);

    }

  }

  return result;

}

console.log('P: ', arrNPFnSub(1,[1,2,3,4,5],[],[]));