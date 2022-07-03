

function convertArgsToArray() {
    console.log(arguments);

    // arguments 객체를 배열로 변환
    // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
    var arr = Array.prototype.slice.apply(arguments); // arguments.slice
    // var arr = [].slice.apply(arguments);

    console.log(arr);
    return arr;
}

convertArgsToArray(1, 2, 3);
