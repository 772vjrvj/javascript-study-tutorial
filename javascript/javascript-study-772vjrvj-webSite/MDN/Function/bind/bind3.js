function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// 선행될 인수를 설정하여 함수를 생성합니다.
var leadingThirtysevenList = list.bind(null, 37);

var list2 = leadingThirtysevenList();  // [37]

var list3 = leadingThirtysevenList(1, 2, 3);  // [37, 1, 2, 3]


function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var result1 = addArguments(1, 2); // 3

// 첫 번째 인수를 지정하여 함수를 생성합니다.
var addThirtySeven = addArguments.bind(null, 37);

var result2 = addThirtySeven(5); // 37 + 5 = 42

// 두 번째 인수는 무시됩니다.
var result3 = addThirtySeven(5, 10); // 37 + 5 = 42