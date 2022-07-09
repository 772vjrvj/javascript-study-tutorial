
function setting(id ,sec){
  var elem;
  elem = document.getElementById('box');
  elem.style.transition = 'all ' + sec + 's' + ' ease-in-out';
  return elem;
}

function slide() {
  
  var elem = setting('box', 2);

  if(elem.style.height !== '0px'){
    elem.style.height = '0px';
  }else{
    elem.style.height = '400px';
  }
}


