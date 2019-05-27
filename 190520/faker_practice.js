var faker = require("faker");

// Random product names and prices 10 times

for (let index = 0; index < 10; index++) {
  console.log(faker.commerce.product + " " + faker.commerce.price);
}
