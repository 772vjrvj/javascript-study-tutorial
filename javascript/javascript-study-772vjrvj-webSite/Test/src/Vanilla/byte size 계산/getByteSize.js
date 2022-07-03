
//utf-8 한글은 한글자 3byte
function getByteSize(value) {

    var byteSize = value.length;
    // 띄어쓰기는 여기서 1개의 길이가 된다.
    // "홍 길 동" 일단 사이즈는 5다.

    byteSize += 2 * ((escape(value) + "%u").match(/%u/g).length - 1);	
    // 유니코드 계산 (계산의 편의를 위해 1개라도 match시키기 위해 "%u"를 더했고)
    // "홍길동" 각각 글자는 유니코드로 변환시 %u가 붙게 된다. 그래서 3개의 %u와 기존의 1개의 %u가 더해저
    // 4개의 %u가 되고 편의를 위해 넣었던 1개를 빼준다. 결국 홍길동 3글자에 대한 3이 나오고
    // 2를 곱해( 2 * 3 )을 해서 6을 만들고 처음에 사이즈에서 3이 있었기 때문에 "홍길동"의 총 바이트는 9byte가 된다.
    // utf-8 이기 때문에 9byte다 원래는 2byte
    // 총 9byte에서 띄어 쓰기 2개 포함 해서 총 11byte가 된다.

    byteSize += (value + "\n").match(/\n/g).length - 1; 				
    // 개행문자는 2바이트로 계산
    // 마찬가지로 계산의 편의상(match가 안되면 나중에 더하기 계산하는데 없는 값에 대한 로직을 추가해야 하므로)

    return byteSize;
}

console.log(getByteSize('홍길동') + ' byte');    //9 byte
console.log(getByteSize('홍 길 동') + ' byte');  //11 byte
console.log(getByteSize('abc') + ' byte');       //3 byte