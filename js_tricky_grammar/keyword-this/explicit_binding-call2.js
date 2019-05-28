var colt = {
  firstName: "Colt",
  sayHi: function() {
    return "Hi " + this.firstName;
  }
};

var elie = {
  firstName: "Elie"
  // Look at all this duplication :()
  //   sayHi: function() {
  //     return "Hi " + this.firstName;
  //   }
};

colt.sayHi(); //Hi Colt
colt.sayHi.call(elie);
// elie.sayHi.call(colt); //Hi Elie (but we had to copy and paste the function from above..)

// How can we refactor the duplication using call?
// and set the value of `this` to be elie?
// my answer 1 => elie.call(colt.sayHi()); => 틀림 - 틀린 이유 : colt를 먼저 불렀어야함.
// my answer 2 => elie.sayHi.call(colt); => 틀림 - 틀린 이유 : colt를 먼저 불렀어야함.
// 답 : colt.sayHi.call(elie)
