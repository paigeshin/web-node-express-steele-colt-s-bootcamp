function House(bedrooms, bathrooms, sqFeet) {
  this.bedrooms = bedrooms;
  this.bathrooms = bathrooms;
  this.sqFeet = sqFeet;
}

var house = new House(1, 2, 3);
console.log(house.bedrooms);
console.log(house.bathrooms);
console.log(house.sqFeet);
