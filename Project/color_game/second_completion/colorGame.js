var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){

	setUpModeButtons();
	setUpSquares();
	reset();
	
}

function setUpModeButtons(){
	//mode buttons event listener 
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");

		//이 코드는
		// if(this.textContent == "Easy"){
		// 	numberOfSquares = 3;
		// } else {
		// 	numberOfSquares = 6;
		// }
		//이렇게 줄여줄 수 있다
		this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;

		reset();

		//figure out how many squares to show
		//pick new colors
		//pick a new pickedColor
		//update page to reflect changes
		});
	}
}

function setUpSquares(){
		for(var i=0; i<squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
};

function reset(){
	//generate all new colors
	colors = generateRandomColors(numberOfSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//change colors of squares
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";
}

// easyBtn.addEventListener("click", function(){
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	numberOfSquares = 3;
// 	colors = generateRandomColors(numberOfSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	//style.display = "none"을 이용하면 된다.
// 	for(var i=0; i<squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 		}
// 		else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// 	h1.style.background = "steelblue";

// 	messageDisplay.textContent = "";
// });

// hardBtn.addEventListener("click", function(){
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numberOfSquares = 6;
// 	colors = generateRandomColors(numberOfSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i=0; i<squares.length; i++){
// 		squares[i].style.background = colors[i];
// 		squares[i].style.display = "block";
// 	}
// 	h1.style.background = "steelblue";

// 	messageDisplay.textContent = "";
// });

resetButton.addEventListener("click", function(){
	reset();
})


function changeColors(color){
	//loop through all squares
	for(var i=0; i<squares.length; i++){
		//change each color to match given color 
		squares[i].style.background = color;
	}
}

function pickColor(){
	var double_random_number = Math.random() * colors.length;
	var int_random_number = Math.floor(double_random_number);
	return colors[int_random_number];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//add num random colors to arr 
	//repat num times 
	for(var i=0; i<num; i++){
		//get random color and push into arr 
		arr.push(randomColor());
	}
	//return that array 
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	
	return "rgb(" + r + ", " + g + ", " + b + ")";
}