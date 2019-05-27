console.log("CONNECTED");

function printReverse(arr){
	for(var i = arr.length-1; i >= 0; i--){
		console.log(arr[i]);
	}
}

//*** isUniform() ***

//*********내가 만든 로직과 다름
function isUniform(arr){
	var first = arr[0];
	//하나의 element라도 다를 경우! 
	//즉, 하나를 기준으로 잡고 이것과 다른 경우만 구하면 된다.
	//와우.. 머리 엄청 좋은 방법이다..
	for(var i=0; i<arr.length; i++){
		if(arr[i] !== first){
			return false;
		}
	}
	return true;
}

//밑에는 동작하지 않는 코드다. 
function isUniform2(arr){
	var first = arr[0];
	arr.forEach(function(element){
		if(element !== first){
			return false;
			//여기서 isUniform함수 전체가 멈추지 않기때문에 원하대로 동작하지 않는다.
		}
	})
	return true;
}

//*** sumArray() ***
function sumArray(arr){
	var total = 0;
	arr.forEach(function(element){
		total += element;
	});
	return total;
}

//*** max*() ***
//*********내가 만든 로직과 다름
function max(arr){
	var max = arr[0];
	for(var i=1; i<arr.length; i++){
		if(arr[i] > max){
			max = arr[i];
		}
	}
	return max;
}