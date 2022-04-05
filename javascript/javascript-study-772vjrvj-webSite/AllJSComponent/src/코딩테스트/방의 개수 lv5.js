//https://programmers.co.kr/learn/courses/30/lessons/49190

function Graph(vertex){
  this.list = {};
  this.init(vertex);
  this.cycleCount = 0;
}
Graph.prototype.init = function(vertex){
this.list[vertex] = { 
                  0 : true
                  ,1 : true
                  ,2 : true
                  ,3 : true
                  ,4 : true
                  ,5 : true
                  ,6 : true
                  ,7 : true
              };
}
Graph.prototype.updateDirection = function(fr,to,dir){
var reverse = (dir+4)%8;
this.list[fr][dir] = false;
this.list[to][reverse] = false;
}
Graph.prototype.add = function(fr,to,dir){
if(this.list[to] && this.list[fr][dir]){
  this.cycleCount++;
  this.updateDirection(fr,to,dir);
}else if(!this.list[to]){
  this.init(to);
  this.updateDirection(fr,to,dir);
}
}


function solution(arr) {
var length      = arr.length;       // 입력 받은 배열 길이
var x           = 0;                // 현재 x 좌표 
var y           = 0;                // 현재 y 좌표 
var init        = '0,0';            // 그래프 초기 좌표
var graph       = new Graph(init);
var traceVertex = '';               // 이동 하면서 변하는 좌표

for(var i = 0; i < length; i++){
  var caseX = 0;              // x 증가 값 초기화
  var caseY = 0;              // y 증가 값 초기화
  var num = arr[i];

  switch(num){
      case 0 : caseX+=0; caseY+=1; break;
      case 1 : caseX+=1; caseY+=1; break;
      case 2 : caseX+=1; caseY+=0; break;
      case 3 : caseX+=1; caseY-=1; break;
      case 4 : caseX+=0; caseY-=1; break;
      case 5 : caseX-=1; caseY-=1; break;
      case 6 : caseX-=1; caseY+=0; break;
      case 7 : caseX-=1; caseY+=1; break;
  }

  var current = x+','+y;  // 이전 좌표
  traceVertex = (caseX+x)+','+(caseY+y);  // 이동 후 좌표

  if(num == 1 || num == 3 || num == 5 || num == 7){
      //-------------------------------------------------------------------
      // 좌표 중복 체크를 위해 대각선 이동 시 반을 나누어 좌표 2개를 경로에 추가
      //-------------------------------------------------------------------
      var halfVertex = ((caseX/2)+x)+','+((caseY/2)+y);
      graph.add(current,halfVertex,num);
      var halfCurrent = halfVertex;
      graph.add(halfCurrent,traceVertex,num);
  }else{
      graph.add(current,traceVertex,num);
  }

  x += caseX;
  y += caseY;

}
return graph.cycleCount;
}

console.log(solution([6, 4, 1, 4, 7]));