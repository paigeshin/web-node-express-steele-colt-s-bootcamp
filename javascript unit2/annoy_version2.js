var answer = prompt("Are we there yet?");

while(answer !== "yes" || answer !== "yeah"){

	if(answer.includes("yes") || answer.includes("yeah")){
		break;
	} else {
		answer = prompt("Are we there yet?");
	}
	
}