const box = document.getElementById('box');
const container = document.getElementById('container');

const svgIn = document.getElementById('svgIn');

const btn = document.querySelector('.btn');
let activeLine = false;

let line1 = document.getElementById('line1');
let line2 = document.getElementById('line2');
let line3 = document.getElementById('line3');
let line4 = document.getElementById('line4');

let line5 = document.getElementById('line5');
let line6 = document.getElementById('line6');
let line7 = document.getElementById('line7');
let line8 = document.getElementById('line8');

let drag = false;
let pointX = 0;
let pointY = 0;
let imgPosX = 150;
let imgPosY = 150;
let imgWidth = 300;
let imgHeight = 300;
let rate = 0.08;

btn.onclick = (e) => {
    const active = btn.classList.contains('active');

    if(active){
        btn.classList.remove('active');
        activeLine = false;
        removeLine();
    }else{
        btn.classList.add('active');
        activeLine = true;
    }

}


svgIn.onmousedown = (e) => {
    drag = true;
    pointX = e.offsetX;
    pointY = e.offsetY;
}

svgIn.onmousemove = (e) => {

    // box.style.left = imgPosX + 'px';
    // box.style.top = imgPosY + 'px';




    if(drag){

        const movePointX = e.offsetX; //움직이는 마우스 x좌표
        const movePointY = e.offsetY;  //움직이는 마우스 y좌표
        const diffWidth = movePointX - pointX;
        const diffHeight = movePointY - pointY;

        imgPosX = imgPosX + diffWidth;
        imgPosY = imgPosY + diffHeight;

        const left1 = svgIn.style.left;
        const left2 = left1 ? left1.substring(0, left1.length-2) : 150;

        const top1 = svgIn.style.top;
        const top2 = top1 ? top1.substring(0, top1.length-2) : 150;

        const left3 = Number(left2) + Number(diffWidth);
        const top3 = Number(top2) + Number(diffHeight);

        svgIn.style.left = left3 + 'px';
        svgIn.style.top = top3 + 'px';

    }
}

svgIn.onmouseup = (e) => {
    drag = false;
}


container.onmousemove = (e) => {
    if(!drag && activeLine) {

        if (e.target.id === 'container') {
            pointX = e.offsetX;
            pointY = e.offsetY;
            //박스 위에서 휠
        } else if (e.target.id === 'svgIn') {
            pointX = imgPosX + e.offsetX;
            pointY = imgPosY + e.offsetY;
        }
        lineIn();
        lineOut();

    }else{
        removeLine();
    }

}


container.onwheel = (e) => {

    //컨테이너 위에서 휠
    if(e.target.id === 'container'){
        pointX = e.offsetX;
        pointY = e.offsetY;
    //박스 위에서 휠
    }else if(e.target.id === 'svgIn'){
        pointX = imgPosX + e.offsetX;
        pointY = imgPosY + e.offsetY;
    }

    if(e.deltaY < 0){ //스크롤 up
        rate = 1 + 0.08;
    }else{ //스크롤 down
        rate = 1 - 0.08;
    }
    
    //직선 방정식 점대칭 이용(이미지 위치, 마우스 위치,
    imgPosX = rate * (imgPosX - pointX) + pointX;
    imgPosY = rate * (imgPosY - pointY) + pointY;

    svgIn.style.left = imgPosX + 'px';
    svgIn.style.top = imgPosY + 'px';

    imgWidth = imgWidth * rate;
    imgHeight = imgHeight * rate;

    svgIn.style.width = imgWidth + 'px';
    svgIn.style.height = imgHeight + 'px';

    if(activeLine){
        lineIn();
        lineOut();
    }
    
}


function lineOut(){
    line1.setAttribute('x1',imgPosX);
    line1.setAttribute('y1',imgPosY);
    line1.setAttribute('x2',pointX);
    line1.setAttribute('y2',pointY);

    line2.setAttribute('x1',imgPosX + imgWidth);
    line2.setAttribute('y1',imgPosY);
    line2.setAttribute('x2',pointX);
    line2.setAttribute('y2',pointY);

    line3.setAttribute('x1',imgPosX);
    line3.setAttribute('y1',imgPosY + imgHeight);
    line3.setAttribute('x2',pointX);
    line3.setAttribute('y2',pointY);

    line4.setAttribute('x1',imgPosX + imgWidth);
    line4.setAttribute('y1',imgPosY + imgHeight);
    line4.setAttribute('x2',pointX);
    line4.setAttribute('y2',pointY);
}



function lineIn(){
    line5.setAttribute('x1',0);
    line5.setAttribute('y1',0);
    line5.setAttribute('x2',pointX - imgPosX);
    line5.setAttribute('y2',pointY - imgPosY);

    line6.setAttribute('x1',imgWidth);
    line6.setAttribute('y1',0);
    line6.setAttribute('x2',pointX - imgPosX);
    line6.setAttribute('y2',pointY - imgPosY);

    line7.setAttribute('x1',0);
    line7.setAttribute('y1',imgHeight);
    line7.setAttribute('x2',pointX - imgPosX);
    line7.setAttribute('y2',pointY - imgPosY);

    line8.setAttribute('x1',imgWidth);
    line8.setAttribute('y1',imgHeight);
    line8.setAttribute('x2',pointX - imgPosX);
    line8.setAttribute('y2',pointY - imgPosY);
}



function removeLine(){
    line1.setAttribute('x1',0);
    line1.setAttribute('y1',0);
    line1.setAttribute('x2',0);
    line1.setAttribute('y2',0);

    line2.setAttribute('x1',0);
    line2.setAttribute('y1',0);
    line2.setAttribute('x2',0);
    line2.setAttribute('y2',0);

    line3.setAttribute('x1',0);
    line3.setAttribute('y1',0);
    line3.setAttribute('x2',0);
    line3.setAttribute('y2',0);

    line4.setAttribute('x1',0);
    line4.setAttribute('y1',0);
    line4.setAttribute('x2',0);
    line4.setAttribute('y2',0);

    line5.setAttribute('x1',0);
    line5.setAttribute('y1',0);
    line5.setAttribute('x2',0);
    line5.setAttribute('y2',0);

    line6.setAttribute('x1',0);
    line6.setAttribute('y1',0);
    line6.setAttribute('x2',0);
    line6.setAttribute('y2',0);

    line7.setAttribute('x1',0);
    line7.setAttribute('y1',0);
    line7.setAttribute('x2',0);
    line7.setAttribute('y2',0);

    line8.setAttribute('x1',0);
    line8.setAttribute('y1',0);
    line8.setAttribute('x2',0);
    line8.setAttribute('y2',0);
}


