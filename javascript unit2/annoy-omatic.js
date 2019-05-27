var annoyance;

while(true){

	annoyance = prompt("Are we there yet?");

	if(annoyance === "yes"){
		alert("We finally arrived!");
		break;
	} 
	else if(annoyance === "yeah"){
		alert("We finally arrived!");
		break;
	} 
	else {
		annoyance = prompt("Are we there yet?");
	}

}

var answer = prompt("are we there yet?");

while(answer !== "yes" || answer !== "yeah"){
	var answer = prompt("Are we there yet?");
}

alert("Yeah, We made it!");

