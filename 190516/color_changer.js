var btnChanger = document.getElementById("btnClick");
var bodySelector = document.querySelector("body");
var clicked = false;

// btnChanger.addEventListener("click", function(){

// 	if(!clicked){
// 		bodySelector.style.background = "purple";
// 	}
// 	else {
// 		bodySelector.style.background = "white";
// 	}
// 	clicked = !clicked;
// });

btnChanger.addEventListener("click", function(){
	document.body.classList.toggle("clicked");
});