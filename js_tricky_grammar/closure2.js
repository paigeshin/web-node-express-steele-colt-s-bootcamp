function outer(a) {}
return function inner(b) {
  return a + b;
};

outer(5)(5); // 10;

var storeOuter = outer(5);
storeOuter(10); //15
