var colt = {
  firstName: "Colt",
  sayHi: function() {
    return "Hi " + this.firstName;
  },
  addNumbers: function(a, b, c, d) {
    return this.firstName + " just calculated " + (a + b + c + d);
  }
};

var elie = {
  firstName: "Elie"
};

//new function
var elieCalc = colt.addNumbers.bind(elie, 1, 2, 3, 4);
elieCalc(); //Elie just calcultated 10

//with bind - we do not need to know all the arguments up front!
var elieCalc2 = colt.addNumbers.bind(elie, 1, 2); //function(){}...
elieCalc2(3, 4); //this.name = "elie"로 자동 정의됨.
//bind는 위와 같이 새로운 함수를 정의할 수 있다.

//또 아래 에제를 보면 call과 bind의 차이를 알 수 있다.
colt.addNumbers.call(elie, 1, 2, 3); //Elie just calculated NaN이 출력.
//즉, 곧바로 tasking을 시작한다.
//그리고 모든 argument가 원래 call.addNumbers에서 요구하는 arguments 갯수만큼 있어야 한다.
//하지만 bind는 곧바로 call 하지 않는다.
