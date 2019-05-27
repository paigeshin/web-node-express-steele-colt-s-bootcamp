var guess;
var random = Math.floor(Math.random() * 99) + 1;

while(true){

	guess = Number(prompt("Guess the number"));

	if(random > guess){
		alert("too low");
	} 
	else if(random < guess){
		alert("too high");
	} 
	else {
		alert("You were right!");
		break;
	}

}