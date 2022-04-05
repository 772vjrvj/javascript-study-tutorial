$(function() {
  
  $('#select1').on('change', itemChange);

});


function itemChange(){

    var keyboard = ["갈축","청축","적축"];
    var mouse = ["광마우스","유선마우스","비싼마우스","미키마우스"];
    var monitor = ["17인치","22인치","24인치","26인치"];
     
    var selectItem = $("#select1").val();
     
    var changeItem;
      
    if(selectItem == "키보드"){
      changeItem = keyboard;
    }
    else if(selectItem == "마우스"){
      changeItem = mouse;
    }
    else if(selectItem == "모니터"){
      changeItem =  monitor;
    }
     
    $('#select2').empty();
     
    for(var count = 0; count < changeItem.length; count++){                
        var option = $("<option>"+changeItem[count]+"</option>");
        $('#select2').append(option);
    }
     
}
