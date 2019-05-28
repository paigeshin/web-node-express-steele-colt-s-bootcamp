function Vehicle(make, model, year) {
  this.isRunning = false;
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.turnOn = function() {
  this.isRunning = true;
};

Vehicle.prototype.turnOff = function() {
  this.isRunning = false;
};

Vehicle.prototype.beep = function() {
  if (this.isRunning) {
    return "honk";
  }
};
