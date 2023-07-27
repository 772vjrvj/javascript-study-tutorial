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

    let opacity = 0;
    let intervalID = 0;
    let ing = false;

    function switchImages(newPath)
    {
        if(!ing){
            ing = true;
            intervalID = setInterval(hide,20);
            setTimeout(() => {
                const img = document.querySelector('#logo');
                img.src = newPath;
                intervalID = setInterval(show,20);
                setTimeout(() => {
                    ing = false;
                }, 220);
            }, 220);
        }
    }

    function hide()
    {   
        const img = document.querySelector('#logo');
        opacity = Number(window.getComputedStyle(img).getPropertyValue('opacity'));
        console
        if(opacity > 0){
            opacity = opacity - 0.1;
            img.style.opacity = opacity;
        }
        else
        {
         clearInterval(intervalID);
        }
    }

    function show()
    {
        const img = document.querySelector('#logo');
        opacity = Number(window.getComputedStyle(img).getPropertyValue('opacity'));
        if(opacity < 1){
            opacity = opacity + 0.1;
            img.style.opacity = opacity;
        }
        else
        {
         clearInterval(intervalID);
        }
    }

/*
* ---------------------------------------------------------------------------
* Vanilla JavaScript Version
* ---------------------------------------------------------------------------
*/

