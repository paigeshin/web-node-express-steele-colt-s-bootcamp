var comments = {};
comments.data = ["Good Job!", "Bye", "lame..."];

function print(arr){
	arr.forEach(function(element){
		console.log(element);
	})
}

print(comments.data);

comments.print = function(){
	this.data.forEach(function(element){
		console.log(element);
		//여기서 this는 comments라는 object를 의미한다.
	});
} 

//신승현의 요약
/*
바깥에서 object내에 
안에있는 element를 활용하여
메소드를 추가하고 싶을 때
this를 사용할 수 있다.

ex)
comment라는 object가 있다.
밑에처럼 함수정의. 
comments.print = function(){
	this.data.forEach(function(element){
		console.log(element);
		//여기서 this는 comments라는 object를 의미한다.
	});
} 

*/