window.setTimeout(function() {


	var answer = prompt("What do you want to do?");
	var todos = [];

	while(answer !== "quit"){

		if(answer === "new"){
			var activity = prompt("Please, write your action");
			todos.push(activity);
			console.log("Your new doing is successfully added!");
			console.log("**********");
			todos.forEach(function(todo, index){
				console.log(index + ":" + todo);
			});
			console.log("**********");
		}
		else if(answer === "list"){
			console.log("Here's your lists of doing");
			console.log("**********");
			todos.forEach(function(todo){
				console.log(index + ":" + todo);
			});
			console.log("**********");
		}
		else if(answer === "delete"){
			var index_of_removed = prompt("Please, write the index of thing that you want to delete");
			if(todos.length > index_of_removed){
				todos.splice(index_of_removed, 1);
				console.log("successfully deleted!");
			}
			else {
				console.log("Invalid Value");
			}

		}

		answer = prompt("What do you want to do?");
	}

}, 500);