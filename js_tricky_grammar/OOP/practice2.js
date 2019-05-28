function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  return "Hi " + this.name;
};

elie = new Person("Elie");
elie.sayHi();
