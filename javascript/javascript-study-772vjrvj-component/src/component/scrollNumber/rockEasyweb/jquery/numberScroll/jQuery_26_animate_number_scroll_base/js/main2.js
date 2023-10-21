$(function(){
    var executed = false;
    $('.section2').waypoint(function(){
        var targetNumber = $('.animate').attr('data-rate');
        if(!executed){
            var percent_number_step = $.animateNumber.numberStepFactories.append(' %')
            $('.animate').animateNumber(
                { 
                    number: targetNumber,
                    numberStep: percent_number_step,
                },
                {
                    easing: 'swing',
                    duration: 1500
                }
            );
            executed = true;
        }
    },
    {
        offset: '80%'
    });
})