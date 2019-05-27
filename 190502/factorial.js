function f(number){

	//number 가 10
	//나의 문제.. 계산된 값이 도무지 왜 저장이 안되는거지?

	var result = 1;

	for(var i=1;i<=number;i++){
		result = result * i;
	}

	return result;

}

function f2(number){

	if(number === 0){
		return 1;
	}

	var result = number;

	for(var i = number - 1; i > 0; i--){
		result = result * i;
	}

	return result;

}

f(10);
console.log(f(10));