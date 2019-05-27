window.setTimeout(function() {

var answer = prompt("What would you like to do?");
var todolists = [];

while(answer !== "quit"){

	if(answer === "new"){
		var new_action = prompt("Add your activity");
		todolists.push(new_action);
	}
	else if(answer === "list"){
		console.log(todolists);
	}

	answer = prompt("What would you like to do?");

}


}, 500);