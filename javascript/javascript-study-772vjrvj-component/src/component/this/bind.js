const module = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };
  
  const unboundGetX = module.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined
  
  const boundGetX = unboundGetX.bind(module);
  console.log(boundGetX());
  // expected output: 42
  
  
  
  
  
  function list() {
    return Array.prototype.slice.call(arguments);
  }
  
  function addArguments(arg1, arg2) {
    return arg1 + arg2;
  }
  
  const list1 = list(1, 2, 3);
  //  [1, 2, 3]
  
  const result1 = addArguments(1, 2);
  //  3
  
  // Create a function with a preset leading argument
  const leadingThirtysevenList = list.bind(null, 37);
  
  // Create a function with a preset first argument.
  const addThirtySeven = addArguments.bind(null, 37);
  
  const list2 = leadingThirtysevenList();
  //  [37]
  
  const list3 = leadingThirtysevenList(1, 2, 3);
  //  [37, 1, 2, 3]
  
  const result2 = addThirtySeven(5);
  //  37 + 5 = 42
  
  const result3 = addThirtySeven(5, 10);
  //  37 + 5 = 42
  //  (the second argument is ignored)
  ​
  
  ​