const box = document.getElementById('box');
const container = document.getElementById('container');
const boxWrapper = document.getElementById('boxWrapper');




let drag = false;
let pointX = 0;
let pointY = 0;
let imgPosX = 150;
let imgPosY = 150;
let imgWidth = 300;
let imgHeight = 300;
let rate = 0.08;

box.onmousedown = (e) => {
    drag = true;
    pointX = e.offsetX;
    pointY = e.offsetY;
}

box.onmousemove = (e) => {
    if(drag){
        const movePointX = e.offsetX; //움직이는 마우스 x좌표
        const movePointY = e.offsetY;  //움직이는 마우스 y좌표
        const diffWidth = movePointX - pointX;
        const diffHeight = movePointY - pointY;

        imgPosX = imgPosX + diffWidth;
        imgPosY = imgPosY + diffHeight;

        // const left1 = box.style.left;
        // const left2 = left1.substring(0, left1.length-2);
        //
        // const top1 = box.style.top;
        // const top2 = top1.substring(0, top1.length-2);
        //
        // const left3 = Number(left2) + Number(diffWidth);
        // const top3 = Number(top2) + Number(diffHeight);

        box.style.left = imgPosX + 'px';
        box.style.top = imgPosY + 'px';

    }
}

box.onmouseup = (e) => {
    drag = false;
}


container.onwheel = (e) => {

    //컨테이너 위에서 휠
    if(e.target.id === 'container'){
        pointX = e.offsetX;
        pointY = e.offsetY;
    //박스 위에서 휠
    }else if(e.target.id === 'box'){
        pointX = imgPosX + e.offsetX;
        pointY = imgPosY + e.offsetY;
    }else if(e.target.id === 'boxWrapper'){
        pointX = 150 + e.offsetX;
        pointY = 150 + e.offsetY;
    }


    if(e.deltaY < 0){ //스크롤 up
        rate = 1 + 0.08;
    }else{ //스크롤 down
        rate = 1 - 0.08;
    }
    
    //직선 방정식 점대칭 이용(이미지 위치, 마우스 위치,
    imgPosX = rate * (imgPosX - pointX) + pointX;
    imgPosY = rate * (imgPosY - pointY) + pointY;

    box.style.left = imgPosX + 'px';
    box.style.top = imgPosY + 'px';

    imgWidth = imgWidth * rate;
    imgHeight = imgHeight * rate;

    box.style.width = imgWidth + 'px';
    box.style.height = imgHeight + 'px';
    
}
