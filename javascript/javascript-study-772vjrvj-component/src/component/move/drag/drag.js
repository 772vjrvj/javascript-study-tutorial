const box = document.getElementById("box");
let drag = false;
let pointX = 0;
let pointY = 0;
let imgPosX = 150;
let imgPosY = 150;

box.onmousedown = (e) => {
    drag = true;
    pointX = e.offsetX;
    pointY = e.offsetY;
}

box.onmousemove = (e) => {
    if(drag){
        console.log('ddd');
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