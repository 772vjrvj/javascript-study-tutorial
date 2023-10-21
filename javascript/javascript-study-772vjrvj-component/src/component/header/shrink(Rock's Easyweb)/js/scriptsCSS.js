/*
import ScrollToTop from './../../../../../study/materio-1.0.0/javascript-version/src/@core/components/scroll-to-top/index';
import Document from './../../../../../study/DashUI-1.0.0/pages/_document';
import Document from './../../../../../study/DashUI-1.0.0/pages/_document';
* ---------------------------------------------------------------------------
* jQuery Version
* ---------------------------------------------------------------------------
*/

const $window = window,
    $mainHeader = document.querySelector('#main-header'), 
    $defaultLogo = 'images/logo.svg',
    $smallLogo = 'images/logo-shrink.svg';

    $window.addEventListener('scroll', (e) => {
        if(window.scrollY > 100){
            if(!$mainHeader.classList.contains('shrink')){
                $mainHeader.classList.add('shrink');
                switchImages($smallLogo);
            }
        }else{
            if($mainHeader.classList.contains('shrink')){
                $mainHeader.classList.remove('shrink');
                switchImages($defaultLogo);
            }
        }
    })

    async function switchImages(image){
        const img = document.querySelector('#logo');
        await fadeOut(img, 200);
        img.src = image;
        await fadeIn(img, 200);
    }

    function fadeOut(target, duration = 500) {
        return new Promise(resolve => {
            const animationEnded = () => {
                // target.style.display = 'none';
                target.onanimationend = null;
                target.style.animation = null;
                resolve();
            };
            target.onanimationend = animationEnded;
            target.style.animation = `fade-out ${duration}ms 1`;
        });
    }

    function fadeIn(target, duration = 500, display = 'block') {
        return new Promise(resolve => {
            const animationEnded = () => {
                target.onanimationend = null;
                target.style.animation = null;
                resolve();
            };
            target.onanimationend = animationEnded;
            // target.style.display = display;
            target.style.animation = `fade-in ${duration}ms 1`;
        });
    }


/*
* ---------------------------------------------------------------------------
* Vanilla JavaScript Version
* ---------------------------------------------------------------------------
*/

