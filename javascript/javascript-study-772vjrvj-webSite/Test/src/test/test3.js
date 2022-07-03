function solution(arrows) {

  let a = [0,0];
  let b = [0,0];
  let vectors = [];
  let locations = [a];
  let answer = 0;
  for (let i = 0; i < arrows.length; i++) {
    switch (arrows[i]) {
      case 0: //0 [0, +1]
        b[0] = a[0];
        b[1] = a[1] + 1;

        ;

        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];

        break;

      case 1:
        //1 [+1, +1]
        b[0] = a[0] + 1;
        b[1] = a[1] + 1;


        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      case 2:
        //2 [+1, 0]
        b[0] = a[0] + 1;
        b[1] = a[1];


        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];

        break;

      case 3:
        //3 [+1, -1]
        b[0] = a[0] + 1;
        b[1] = a[1] - 1;


        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      case 4:
        //4 [0, -1]
        b[0] = a[0];
        b[1] = a[1] - 1;


        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      case 5:
        //5 [-1, -1]
        b[0] = a[0] - 1;
        b[1] = a[1] - 1;

        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      case 6:  
        //6 [-1, 0]
        b[0] = a[0] - 1;
        b[1] = a[1];

        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      case 7:
        //7 [-1, +1]
        b[0] = a[0] - 1;
        b[1] = a[1] + 1;


        if(!vectorsChk([a,b], vectors)){
          if(locationsChk(b, locations)){
            answer++;
          }
        }
   
        vectors.push([a,b]);
        locations.push(b);
        a = b;
        b =[];
        break;

      default:
        break;
    }
    

  }

  return answer;
}



function vectorsChk(v, vectors)
{
  for (let i = 0; i < vectors.length; i++) {
    const vec = vectors[i];
    if((vec[0] === v[0] && vec[1] === v[1]) || (vec[0] === v[1] && vec[1] === v[0])){
      return true;
    }
  }
  return false;
}


function locationsChk(l, locations){

  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    if(loc[0] === l[0] && loc[1] === l[1]){
      return true;
    }
  }
  return false;
}



let result = solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0]);

console.log(result);