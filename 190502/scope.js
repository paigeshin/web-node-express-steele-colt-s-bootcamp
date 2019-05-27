function doMath(){
	var x = 40;
	console.log(x);
}

x // => error

var y = 99;
function doMoreMath(){
	console.log(y);
}

doMoreMath(); // => no error 

//함수 안쪽에 정의된 변수는 바깥에서 접근할 수 없지만,
//함수 바깥에 정의된 변수는 함수내부에서 접근할 수 있다. 

var phrase = "hi there!";
function doSomething(){
	var phrase = "Goodbye!";
	console.log(phrase);
}

phrase

// => GoodBye가 출력된다. 
// 바깥에 정의한 변수를 함수내에서 재정의하면, 재정의한 값이 출력된다. 

setInterval(function(){
	console.log("I am an anonymous function!");
	console.log("This is awesome!");
}, 2000)