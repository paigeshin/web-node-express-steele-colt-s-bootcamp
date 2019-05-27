var numSquares = 6;
var colors = generateRandomColorArray(numSquares);
var squares = document.querySelectorAll(".square");
var right_answer_rgb = random_rgb_setting();
var color_display = document.getElementById("rgb_color");
var h1 = document.querySelector("h1");
var btnReset = document.querySelector("#reset");
// var btnEasy = document.getElementById("btnEasy");
// var btnHard = document.getElementById("btnHard");
var btnMode = document.querySelectorAll(".mode");
var message = document.getElementById("message");

for(var i=0; i<btnMode.length; i++){

	btnMode[i].addEventListener("click", function(){
		btnMode[0].classList.remove("selected");
		btnMode[1].classList.remove("selected");
		this.classList.add("selected");

		this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;

		reset();
	})
};

function reset(){
	//generate all new colors
	colors = generateRandomColorArray(numSquares);

	//pick a new random color from array 
	right_answer_rgb = random_rgb_setting();

	//change colorDisplay to match picked color
	color_display.textContent = right_answer_rgb;

	//change colors of squares
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		} 
		else {
			squares[i].style.display = "none";
		}
	}

	//다시 h1의 background color를 원래대로 바꿔준다.
	h1.style.backgroundColor = "steelblue";

	btnReset.textContent = "New Colors";
	message.textContent = "";
}

// btnEasy.addEventListener("click", function(){
// 	btnEasy.classList.add("selected");
// 	btnHard.classList.remove("selected");
// 	//easybutton을 누르면 사각형 세 개가 형성된
// 	numSquares = 3;
// 	colors = generateRandomColorArray(numSquares);
// 	right_answer_rgb = random_rgb_setting();
// 	color_display.textContent = right_answer_rgb;
// 	//앞에 3개는 보여주고 뒤에 3개는 지워줌
// 	for(var i=0; i<squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 		} 
// 		else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// 	h1.style.background = "steelblue";
// 	message.textContent = "";
// });

// btnHard.addEventListener("click", function(){
// 	btnHard.classList.add("selected");
// 	btnEasy.classList.remove("selected");
// 	numSquares = 6;	
// 	colors = generateRandomColorArray(numSquares);
// 	right_answer_rgb = random_rgb_setting();
// 	color_display.textContent = right_answer_rgb;
// 	//앞에 3개는 보여주고 뒤에 3개는 지워줌
// 	for(var i=0; i<squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 			squares[i].style.display = "block";
// 		} 
// 	}
// 	h1.style.background = "steelblue";
// 	message.textContent = "";
// });

color_display.textContent = right_answer_rgb;

var message_to_display = document.getElementById("message");

btnReset.addEventListener("click", function(){
	reset();
});

for(var i=0; i<squares.length; i++){
	squares[i].style.background = colors[i];
	//이벤트 리스너
	squares[i].addEventListener("click", function(){
		
		var clickedColor = this.style.background;

		if(clickedColor === right_answer_rgb){
			message_to_display.textContent = "Correct!";
			h1.style.backgroundColor = right_answer_rgb;
			btnReset.textContent = "Play again?";
			changeAllColor(right_answer_rgb);
		}
		else {
			message_to_display.textContent = "Try again!";
			this.style.backgroundColor = "#232323";
		}

	});
}


function changeAllColor(color){

	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}

}

function random_rgb_setting(){
	var double_random = Math.random() * colors.length;
	var int_random = Math.floor(double_random);
	return colors[int_random];
}

function generateRandomColorArray(num){

	var arr = [];

	for(var i=0; i<num; i++){
		arr.push(generateRandomRGB_string());
	}


	return arr;

}

function generateRandomRGB_string(){

	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}