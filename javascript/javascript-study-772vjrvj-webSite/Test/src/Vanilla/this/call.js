function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }
  
  console.log(new Food('cheese', 5).name);
  // expected output: "cheese"
  
  
  
  function example3() {
    console.log(Array.prototype.join.call(arguments, '&'));
  }
  example3(1, 'string', true); // '1&string&true'
  
  
  function convertArgsToArray() {
    console.log(arguments);
  
    // arguments 객체를 배열로 변환
    // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
    var arr = Array.prototype.slice.call(arguments); // arguments.slice
    // var arr = [].slice.apply(arguments);
  
    console.log(arr);
    return arr;
  }
  convertArgsToArray(1, 2, 3);
  ​