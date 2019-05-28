function outer() {
  var data = "closures are";
  return function inner() {
    var innerData = "awesome";
    return data + innerData;
  };
}

outer();
//ƒ inner() {
//      var innerData = "awesome";
//      return data + innerData;
//}

outer()();
//"closures are awesome"
