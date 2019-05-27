//동적으로 어레이를 출력하게 하기
var to_do_lists = ["Buy Robes", "Fight Malfoy", "Buy New Wand", "Kill Voldemort"];
//line-through property를 적용시키기 위해.
var done = false;

printTodos(to_do_lists);
init();

$("#to-do-box #btnAdd").on("click", function(){
	//input창이 생김. 사라짐.
	$("input").fadeToggle();
})

//일단 유저가 enter를 눌렀을 시에... todo를 추가해준다.
$("input").on("keypress", function(event){
	if(event.which == 13){	
		//유저가 enter를 누르면 밑에 todolist가 추가된다. => 어레이에 값을 추가한다.
		var todo_to_add = $("input").val();
		$("input").val("");
		to_do_lists.push(todo_to_add);
		print_added_todo();
		init();
	}
})

//처음에 어레이에 있는 모든 todo들을 출력한다.
function printTodos(to_do_lists) {
	var todo;
	for(var i=0; i<to_do_lists.length; i++){
		todo = $("<p class='to-do-element'>" + "<button class='btnRemove'><i class='fas fa-trash'></i></button> " + to_do_lists[i] + "</p>")
		$("#to-do-box").append(todo);
	}
}

//추가된 todo. array의 가장 마지막 index를 출력.
function print_added_todo(){
	var todo;
	todo = $("<p class='to-do-element'>" + "<button class='btnRemove'><i class='fas fa-trash'></i></button> " + to_do_lists[to_do_lists.length - 1] + "</p>");
	$("#to-do-box").append(todo);
}



function init(){

	//클릭으로 눌렀을 시에 line-through
	$(".to-do-element").on("click", function(){
		if(!done){
			$(this).css("text-decoration", "line-through");
			done = true;
		} else {
			$(this).css("text-decoration", "none");
			done = false;
		}
	})

	//hover시에 빨간 지우기 버튼이 나옴
	$(".to-do-element").on("mouseover", function(event){
		console.log(event);
		$(".to-do-element").find("button").css("display", "inline");
	})
	//마우스를 때면 지워짐
	$(".to-do-element").on("mouseout", function(event){
		console.log(event)
		$(".to-do-element").find("button").css("display", "none");
	})

	//remove button을 누르면 해당 todo 삭제
	$(".btnRemove").on("click", function(){
		$(this).parent().remove();
	})

}