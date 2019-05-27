var someObject = {
	friends: [
		{name: "Malfoy"},
		{name: "Crabbe"},
		{name: "Goyle"}
	],
	color: "baby blue",
	isEvil: true
};

var a = someObject.friends;
someObject.friends.name;
var b = a.friends;
someObject.friends.name.Malfoy;
var c = b.Malfoy;

someObject.friends[0]