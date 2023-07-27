/*
import ScrollToTop from './../../../../../study/materio-1.0.0/javascript-version/src/@core/components/scroll-to-top/index';
* ---------------------------------------------------------------------------
* jQuery Version
* ---------------------------------------------------------------------------
*/

var $window = $(window),
    $mainHeader = $('#main-header'),
    $defaultLogo = 'images/logo.svg',
    $smallLogo = 'images/logo-shrink.svg';

    $window.scroll(function(){
        if($(this).scrollTop() > 100){
            if(!$mainHeader.hasClass('shrink')){
                $mainHeader.addClass('shrink');
                switchImages($smallLogo);
            }
        }else{
            if($mainHeader.hasClass('shrink')){
                $mainHeader.removeClass('shrink');
                switchImages($defaultLogo);
            }
        }
    });

    function switchImages(newPath){
        var $logo = $('#logo');
        $logo.fadeOut(300, function(){
            $logo.attr('src', newPath);
            $logo.fadeIn(300);
        })
    }


/*
* ---------------------------------------------------------------------------
* Vanilla JavaScript Version
* ---------------------------------------------------------------------------
*/

