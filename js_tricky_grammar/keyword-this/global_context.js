console.log(this); // window

function whatIsThis() {
  return this;
}

function variablesInThis() {
  //Since the value of this is the window
  //all we are doing here is creating a global variable
  this.person = "Elie";
}

console.log(person); //Elie

whatIsThis(); //window
