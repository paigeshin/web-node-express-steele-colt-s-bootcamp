var faker = require('faker');

for(var i=0; i<10; i++){
	var randomProduct = faker.commerce.product();
	var randomPrice = faker.commerce.price();
	console.log(randomProduct + "\n" + randomPrice);
}