//https://jun-choi-4928.medium.com/javascript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-21df4b536349


//조합
//서로다른 n개의 수정에서 k를 뽑는 배열 배열은 기본적으로 중복값이 없다는 가정
//ord
function arrNComFnSub(ord, mainArr, surIdx, eleArr, result){
  if(ord-1 <1) return;
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
