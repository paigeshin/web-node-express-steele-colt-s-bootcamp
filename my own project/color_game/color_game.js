var numOfSquares = 6;

var colors_array = rgbColorsArrayBuilder(6);
var squares = document.querySelectorAll(".square");
var rgb_color_display = document.querySelector("#rgb_color");
var h1 = document.querySelector("h1");
//페이징을 리로딩할 때마다 새로운 값을 설정해줌
var random_color = randomColor(colors_array);
rgb_color_display.textContent = random_color;
//중앙에 답을 맞추거나 틀렸을 때 보여주는 메시지
var message = document.querySelector("#message");
//btnReset
var btnReset = document.querySelector("#btnReset");
//btnEasy, btnHard
var btnEasy = document.querySelector("#btnEasy");
var btnHard = document.querySelector("#btnHard");

init();

function init(){
	//easy를 누르면 사각형 세 개만 생성
	btnEasy.addEventListener("click", function(){
		if(!btnEasy.classList.contains("selected")){
			numOfSquares = 3;
			reset();
		}
		btnHard.classList.remove("selected");
		btnEasy.classList.add("selected");


	});

	//hard를 누르면 사각형 여섯 개만 생성
	btnHard.addEventListener("click", function(){
		if(!btnHard.classList.contains("selected")){
			numOfSquares = 6;
			reset();
		}
		btnEasy.classList.remove("selected");
		btnHard.classList.add("selected");
	});

	//square 색깔을 바꿔줌
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors_array[i];
	}

	//Square를 클릭하면 로직을 적용한다
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			if(this.style.backgroundColor == random_color){
				//클릭한 부분의 backgroundColor 색깔과 문제 random_color와 색깔이 같은 경우
				//답이 맞았다면 모든 사각형을 '맞는 답의 rgb 색깔로 바꿔준다'
				changeColorAccordingToRightAnswer(random_color);
				//메시지 보여주기
				message.textContent = "Correct";
				h1.style.backgroundColor = random_color;
				btnReset.textContent = "Play Again?";
			}
			else {
				//클릭한 부분의 색깔과 문제 random_color와 색깔이 다른 경우 
				//답이 틀린 경우 배경화면과 같은 색으로 바뀐다
				this.style.backgroundColor = "#232323";
				//메시지 보여주기
				message.textContent = "Try Again!";
			}
		});
	};

	//new Colors 버튼을 누름.. 즉 게임 재실행
	btnReset.addEventListener("click", function(){
		if(btnEasy.classList.contains("selected")){
			reset();
		}
		else if(btnHard.classList.contains("selected")){
			reset();
		}
	});
}


//랜덤하게 어레이 내부에서 색을 골라주는 함수
function randomColor(arr){

	var random_index = Math.floor(Math.random() * arr.length);

	return arr[random_index];
}

//맞는 답을 골랐을 때 맞는 답의 rgb로 모든 색깔을 바꿔주는 함수
function changeColorAccordingToRightAnswer(rgb_value){

	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = rgb_value;
	}

}

//랜덤하게 어레이를 생성하는 함수
function rgbColorsArrayBuilder(numOfIndexes){

	var arr = [];

	for(var i=0; i<numOfIndexes; i++){
		arr.push(rgbStringBuilder());
	}

	return arr;
}

//랜덤하게 rgb를 생성하는 함수
function rgbStringBuilder() {

	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	var rgb_string = "rgb(" + r + ", " + g + ", " + b + ")";

	return rgb_string;
}

//게임을 초기화 시키는 함수
function reset(num){
	colors_array = rgbColorsArrayBuilder(numOfSquares);
	random_color = randomColor(colors_array);
	rgb_color_display.textContent = random_color;
	//square 색깔을 바꿔줌
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors_array[i];
	}
	h1.style.backgroundColor = "steelblue";
	btnReset.textContent = "New Colors";
	message.textContent = " ";

	if(numOfSquares === 3){
		squares[3].style.display = "none";
		squares[4].style.display = "none";
		squares[5].style.display = "none";
	}

	if(numOfSquares === 6){
		squares[3].style.display = "inline-block";
		squares[4].style.display = "inline-block";
		squares[5].style.display = "inline-block";
	}
}



