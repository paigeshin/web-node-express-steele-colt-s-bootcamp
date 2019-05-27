var obj = {
	name: "Chunk",
	age: 45,
	isCool: false,
	friends: ["bob", "tina"],
	add: function(x, y){
		return x + y;
	}
}

obj.add(3, 5);

obj.speak = function(a, b, c){
	console.log(a);
	console.log(b);
	console.log(c);
}

obj.speak("haha", "hoho", "hehe");