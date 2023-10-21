window.addEventListener('DOMContentLoaded', () => {
    console.log('ddd');
    const numAnimation = document.querySelectorAll('.num_animation');
    
    function changeNum(idx){
        let num = 0;
        let intervalTime = 10;
        const targetNum = numAnimation[idx].getAttribute('data-rate');
        if(targetNum > 200){
            intervalTime = 5; //더빠름
        }
        const timer = setInterval(() => {
            ++num;
            numAnimation[idx].innerText = num;
            if(num == targetNum){
                clearInterval(timer);
            }
        }, intervalTime);
    }

    console.log('numAnimation.length : ', numAnimation.length);

    for (let i = 0; i < numAnimation.length; i++) {
        changeNum(i);
    }
});





