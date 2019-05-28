var colt = {
  firstName: "Colt",
  sayHi: function() {
    setTimeout(
      function() {
        console.log("Hi " + this.firstName);
      }.bind(this),
      1000
    );
  }
};

//setTimeout 내에 선언 되어있는 this => window
//bind 내에 선언 되어있는 this => "colt"
