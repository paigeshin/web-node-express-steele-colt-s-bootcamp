var lis = document.querySelectorAll("li");

for(var i=0; i<lis.length; i++){
	lis[i].addEventListener("mouseover", function(){
		this.style.color = "green";
	});
}

for(var i=0; i<lis.length; i++){
	lis[i].addEventListener("mouseout", function(){
		this.style.color = "black"; //신기하다.. lis[i]로하면 안되고 반드시 'this' keyword를 사용해야한다. 
		//eventListener 내부에 있는 this는, event가 실행되는 것을 의미한다.
	});
}

for(var i=0; i<lis.length; i++){
	lis[i].addEventListener("click", function(){
		this.classList.toggle("done");
	});
}