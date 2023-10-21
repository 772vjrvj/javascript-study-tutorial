$(function(){

    var excuted = false;

    $(window).scroll(function(){
        var threshold = $('.section2').offset().top - 300;

        if(!excuted){
            if($(window).scrollTop() >= threshold){
                var progressRate = $('.animate').attr('data-rate');
                //animate progress 사용자속성 값 percent->>> 60%
                /*
                    $('box).animate({width:100%, height:100%},1500,easeOutQuint,function(){
                        ...끝나고 할일
                    });
    
                    $('box).animate({width:100%, height:100%},{
                        duration: 1500,
                        easing: 'easeOutQuint',
                        complete: function(){...끝나고 할일},
                        progress: function(){...진행중 할일}
                    });
                */
    
                $({percent: 0}).animate({percent: progressRate},{
                    duration: 1500,
                    progress: function(){
                        var now = this.percent;
                        $('.animate').text(Math.ceil(now)+'%');
                    }
                });
                excuted = true;
            }
        }
    });
})