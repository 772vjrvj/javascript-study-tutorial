//https://drcode-devblog.tistory.com/262
// 상호 평가 - 네이버 코딩테스트 기출문제

function scores(scores){
  
  let result = "";


  if(isScores(scores)){

    for (let index = 0; index < scores.length; index++) {
      const subScores = scores[index];
      if(isScores(subScores)){
        const min = Math.min(...subScores);
        const max = Math.max(...subScores);
        let ave = 0;


        if(subScores[index] === min){
          const filteritems =subScores.filter(item => item === min);

          if(filteritems.length >= 2){
            ave = average(subScores);

          }else{
            subScores.splice(index, 1);
            ave = average(subScores);
          }

        }else if(subScores[index] === max){

          const filteritems =subScores.filter(item => item === max);
          if(filteritems.length >= 2){
            ave = average(subScores);
          }else{
            subScores.splice(index, 1);
            ave = average(subScores);
          }

        }else{
          ave = average(subScores);
        }

        if(ave >= 90){
          result + "A";
        }else if(ave < 90 && ave >=80){
          result + "B";
        }else if(ave < 80 && ave >=70){
          result + "C";
        }else if(ave < 70 && ave >=50){
          result + "D";
        }else if(ave < 50 && ave >= 0){
          result + "F";
        }

      }else{
        return "error"
      }
    }
  }else{
    return "error"
  }

  function isScores(arr){
    if(Array.isArray(arr) === true && arr.length >= 0 && arr.length <=10){
      return true;
    }else{
      return false;
    }
  }

  function average(arr){
    const sum = arr.reduce((sum, cur) => sum + cur,0);
    const average = sum/arr.length;
    return average;
  }

  return result;
}

console.log(scores([[50,90],[50,87]]));