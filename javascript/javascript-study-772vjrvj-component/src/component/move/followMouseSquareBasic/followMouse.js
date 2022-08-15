const container = document.getElementById('container');
const box = document.getElementById('box');

let posX = 0;
let posY = 0;

container.onmousemove = (e) => {
    posX = e.offsetX;
    posY = e.offsetY;
    box.style.left = posX - 25  + 'px';
    box.style.top = posY  - 25  + 'px';
}