var colors = [
"rgb(255, 35, 0)",
"rgb(0, 255, 0)",
"rgb(0, 0, 255)",
"rgb(255, 255, 0)",
"rgb(255, 0, 255)",
"rgb(0, 245, 255)"
];

var squares = document.querySelectorAll(".square");

var right_answer_rgb = random_rgb_setting();
var color_display = document.getElementById("rgb_color");
color_display.textContent = right_answer_rgb;

var message_to_display = document.getElementById("message");

for(var i=0; i<squares.length; i++){
	squares[i].style.background = colors[i];
	//이벤트 리스너
	squares[i].addEventListener("click", function(){
		
		var clickedColor = this.style.background;

		if(clickedColor === right_answer_rgb){
			message_to_display.textContent = "Correct!";
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