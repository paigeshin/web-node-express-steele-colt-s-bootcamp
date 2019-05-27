
var movies = [
	{
		title: "a sweet bitter life",
		rating: 10,
		hasWatched: true
	},
	{
		title: "World War Z",
		rating: 7,
		hasWatched: true
	},
	{
		title:"Blind Brid",
		rating: 10,
		hasWatched: true
	},
	{
		title:"Sex And The City",
		rating:5,
		hasWatched: false
	}

]

movies.forEach(function(element){
	if(element.hasWatched === true){
		console.log("You have watcehd " + '"' + element.title + '" - ' + element.rating + " stars");
	}
	else {
		console.log("You have not seen " + '"' + element.title + '" - ' + element.rating + " stars" );
	}
});

movies.forEach(function(movie){

	var result = "You have ";
	if(movie.hasWatched){
		result += "watched ";
	}
	else {
		result += "not seen ";
	}
	result += "\"" + movie.title + "\" - ";
	result += movie.rating + " starts";
	console.log(result);
	return result;
})