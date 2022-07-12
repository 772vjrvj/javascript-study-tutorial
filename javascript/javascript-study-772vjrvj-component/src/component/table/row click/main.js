const rb = document.querySelector('.sub-right-container-bottom');
const rt = document.querySelector('.sub-right-container-top');
const lb = document.querySelector('.sub-left-container-bottom');

rb.addEventListener('scroll', (e) => {
    console.log(e);
    rt.scrollLeft = e.target.scrollLeft;
    lb.scrollTop = e.target.scrollTop;
  }
);