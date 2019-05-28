var person = {
  firstName: "Colt",
  sayHi: function() {
    return "Hi " + this.firstName;
  },
  determineContext: function() {
    return this === person;
  },
  dog: {
    sayHello: function() {
      return "Hello " + this.firstName;
    },
    determineContext: function() {
      return this === person;
    }
  }
};

person.sayHi(); //"Hi Colt"
person.determineContext(); //true

//but what is the value of the keyword this right now?
person.dog.sayHello(); //"Hello undefined"
person.dong.determineContext(); //false

//solution
person.dog.sayHello.call(person); // "Hell Colt"
person.dog.determineContext.call(person); //true
//Using call worked! Notice that we do NOT invoke sayHello or determineContext
