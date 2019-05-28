function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  //we can also set properties on the keyword this
  //that are preset values
  this.numWheels = 4;
}

function Motorcycle(make, model, year) {
  Car.call(this, make, model, year);
  this.numWheels = 2;
}

function Motorcycle2(make, model, year) {
  Car.apply(this, [make, model, year]);
  this.numWheels = 2;
}

function Motorcycle3(make, model, year) {
  Car.apply(this, arguments);
  this.numWheels = 2;
}
