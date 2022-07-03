function solution(n, s, a, b, fares) {

  //유효성 검사

  let arr = new Array(n).fill().map((v,i)=> i+1);
  let result = [];

  let firstFiltered1 = arr.filter((element) => element !== s && element !== b);

  let reulstA = [];
  for (let index = 1; index <= fares.length; index++) {

    if(index === 1){

      let data = chkFn(s, a, fares);

      if(!isEmpty(data)){
        reulstA.push([data]);
      }

    }else{

      const newArr = arrNPFnSub(index-1, firstFiltered1, [], []);
      console.log('newArr : ', newArr);

      for (let i = 0; i < newArr.length; i++) {
        
        let newsSubArr = newArr[i];

        if(newsSubArr.length === 1){
          let a = chkFn(s, newsSubArr[0], fares);
          let b = chkFn(newsSubArr[0], a, fares);

          if(!isEmpty(a) && !isEmpty(b)){
            reulstA.push([a,b]);
          }

        }else if(newsSubArr.length === 2){
          
          let a = chkFn(s, newsSubArr[0], fares);
          let b = chkFn(newsSubArr[0], newsSubArr[1], fares);
          let c = chkFn(newsSubArr[1], a, fares);

          if(!isEmpty(a) && !isEmpty(b) && !isEmpty(c)){
            reulstA.push([a,b,c]);
          }

        }else{

          let l = [];
          for (let j = 0; j < newsSubArr.length; j++) {

            if(j===0){
              let a = chkFn(s, newsSubArr[j], fares);
              if(isEmpty(a)){
                break;
              }else{
                l.push(a);
              }

            }else if(j > 0 && j <= newsSubArr.length-2){
              let b = chkFn(newsSubArr[j], newsSubArr[j-1], fares);

              if(isEmpty(b)){
                break;
              }else{
                l.push(b);
              }
            }else if(j=== newsSubArr.length-1){

              let a = chkFn(a, newsSubArr[j], fares);
              let b = chkFn(newsSubArr[j-1], newsSubArr[j], fares);

              if(!isEmpty(a) && !isEmpty(b)){
                l.push(a);
                l.push(b);
                reulstA.push([l]);

              }else{
                break;
              }
            }
          }
        }
      }
    }
  }
}

function arrNPFnSub(ord, mainArr, eleArr, result){

  if(ord !== 0){    
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
  }

  return result;

}

function chkFn(a, b, arr){

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if((element(2) !== a && element.indexOf(a)) && (element(2) !== b && element.indexOf(b))){
      return element;
    }
  }
  return;
}

function isEmpty(item){
  if(item !== null && item !== undefined && item !== ''){
    if(Array.isArray(item) && item.length !== 0){
      return false;
    }
  }
  return true;
}




solution(7,4,1,2,[[4,1,15],[3,2,10],[5,1,15],[2,4,6],[2,5,6],[7,4,6]]);