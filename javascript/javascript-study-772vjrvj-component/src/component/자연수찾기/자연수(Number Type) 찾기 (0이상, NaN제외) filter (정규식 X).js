const arr = [
  { id: 15 }, { id: -1 }, { id: 0 }, { id: 3 }, { id: 12.2 }, { id: -12.2 },
  {}, { id: null }, { id: NaN }, { id: 'undefined' }, { id: false },
  { id: '' }, { id: ' ' }, { id: 'abc' } , { id: 00001 } , { id: '00001' }
]
let invalidEntries = 0;

const arrByID = arr.filter(filterByID);

console.log('Filtered Array\n', arrByID);

//타입체크
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

//넘버타입 이고 NaN 이 아닌것 (NaN도 Number 타입니다.)
function isNumber(target) {
  if (getType(target) === 'Number' && !isNaN(target))
    return true;
  return false;
}

//소수점체크
function hasDot(target){
  var strTarget = String(target);
  if(strTarget.indexOf('.') > -1){
    return true;
  }
  return false;
}

function filterByID(item) {

  if (isNumber(item.id) && item.id > 0 && !hasDot(item.id)) {
    return true;
  }

  invalidEntries++;

  return false;
}