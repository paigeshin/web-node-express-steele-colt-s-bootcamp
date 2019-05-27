//누군가가 만약 이런 문제를 냈다.
//어레이의 길이만큼 어떤 행위를 하는 함수를 정의하시오. 
var colors = ["red", "orange", "yellow"];

function myForEach(arr, func){
	for(var i=0; i<arr.length; i++){
		func(arr[i]);
	}
}

myForEach(colors, alert);

//anonymous function
(function(){
	console.log("Im a function!");
});
//그냥 이렇게 정의하면 invoke되지 않는다. 
//이것을 실행시키고 싶다면
(function(){
	console.log("I'm a function!");
})();//뒤에 ()를 추가해주면 된다. 


myForEach(colors, function(color) {
	console.log(color);
});

//우리는 위에 정의한 함수를 통해서 Array.Prototype에 함수를 정의한 것과 마찬가지다.
//솔직히 왜 그런지는 아직 잘모르겠다. - 5월 3일
//-아마도 argument를 어레이로 받아서 그런건가? 

//아무튼 forEach를 이렇게 재정의 할 수 있다..
Array.prototype.myForEach = function(func){
	for(var i=0; i<this.length; i++){
		func(this[i]);	
	}
}
