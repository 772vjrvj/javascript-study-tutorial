function scrollPageTo (to, duration = 600) {
  const easeOutQuad = function (t, b, c, d) {
    t /= d;
	  return -c * t*(t-2) + b;
  };
  return new Promise((resolve, reject) => {
    const element = document.scrollingElement;
    if (typeof to === 'string') {
      to = document.querySelector(to) || reject();
    }
    if (typeof to !== 'number') {
      to = to.getBoundingClientRect().top + element.scrollTop;
    }
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
    const animateScroll = function() {
      currentTime += increment;
      let val = easeOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        resolve();
      }
    };
    animateScroll();
  });
};

function showScrollingBtn(element, heightToShow) {
  const y = window.scrollY;
  if (y >= heightToShow) {
    element.classList.add("show");
  } else {
    element.classList.remove("show");
  }
}

const btn = document.getElementById("button");

window.addEventListener("scroll", function(){
  showScrollingBtn(btn, 800);
});

btn.addEventListener("click", function(){
  scrollPageTo(0);
}); 