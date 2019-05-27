var colors = ["red", "orange", "yellow"];
colors.push("green");

var colors = ["red", "orange", "yellow"];
colors.pop();

//pop() returns the removed element
var col = colors.pop();


//Use unshift to add to the front of an array
var colors = ["red", "orange", "yellow"];
colors.unshift("infrared");

//Use shift to remove the first item in an array. 
var colors = ["red", "orange", "yellow"];
colors.shift();

//Use indexOf() to find the index of an item in an array 
var friends = ["Charie", "Liz", "David", "Mattias", "Liz"];

//returns the first index at which a given element can be found
friends.indexOf("David"); //2
friends.indexOf("Liz"); //1, not 4

//returns -1 if the element is not present
friends.indexOf("Hagrid"); //-1

//Use slice() to copy parts of an aaray
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
//use slice to copy the 2nd and 3nd fruits.
//speicify index where the new array starts(1) and ends(3)
var citrus = fruits.slice(1,3);

//this does not alter the original fruits array
//citrus contains ['Orange', 'Lemon']
//fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']

//You can also use slice() to copy an entire array
var nums = [1,2,3];
var otherNums = nums.slice();
//both arrays are [1,2,3]