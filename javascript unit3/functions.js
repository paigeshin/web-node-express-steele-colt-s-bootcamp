//even number
function even_number(number){

	if(number % 2 === 0){
		return true;
	} 
	else {
		return false;
	}

}
	

//factorial
function factorial(number){

	if(number === 1){
		return 1;
	}
	else {
		return number * factorial(number - 1);
	}
	

}

//kebabToSnake
function kebabToSnake(str){



	var text = str.replace("-", "_");

	return text;


}

console.log(even_number(3));
console.log(factorial(10));
console.log(kebabToSnake("hihihi-hihihi"));
console.log(kebabToSnake("hihihi_hihihi"));