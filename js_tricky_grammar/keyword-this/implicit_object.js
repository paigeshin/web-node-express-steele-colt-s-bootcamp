//Strict mode does NOT make a difference here

var person = {
  firstName: "Elie",
  sayHi: function() {
    return "Hi " + this.firstName;
  },
  determineContext: function() {
    return this === person;
  }
};

person.sayHi();
person.determineContext(); //true
