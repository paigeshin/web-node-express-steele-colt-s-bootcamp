function Vehicle(make, model, year) {
  var isRunning = false;
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.turnOn = function() {
  isRunning = true;
};

Vehicle.prototype.turnOff = function() {
  isRunning = false;
};

Vehicle.prototype.beep = function() {
  if (isRunning) {
    return "honk";
  }
};
