var arr = [1,2,3,4];

function reverse(array){

	for(var i=array.length-1; i>=0; i--){
		console.log(array[i]);
	}

}

reverse(arr);



function isUniform(array){
	//인덱스 1번이 끝까지
	//인덱스 2번이 끝까지
	for(var i=0;i<array.length;i++){
		for(var j=i+1;j<array.length;j++){
			if(array[i]!==array[j]){
				console.log("false");
				return false;
			}
		}
	}
	console.log("true");
	return true;
}

isUniform([1,1,1,1]);
isUniform([2,1,1,1]);
isUniform(["a", "b", "p"]);
isUniform(["b", "b", "b"]);

function sumArray(array){

	var sum = 0;

	array.forEach(function(element){
		sum += element;
	});

	console.log(sum);

}

sumArray([1,2,3]);
sumArray([10,3,10,4]);
sumArray([-5,100]);

function max(array){

	var max = Number.MIN_VALUE;

	for(var i=0; i<array.length; i++){
		if(array[i] > max){
			max = array[i];
		}
	}

	console.log(max);
	return max;
}

max([1,2,3]);
max([10,3,10,4]);
max([-5,100]);

