//player1 버튼을 누르면 스코어가 올라감
//player2 버튼을 누르면 스코어가 올라감
//한계점수를 정해줌
//winner에게 effect를 준다.
//reset 하기 - 나중에 다시 수정
//text input을 받아서 max Score를 수정해주기

var max_score = parseInt($("#max_score").text());

$("#btnPlayer1").on("click", function(){	
	score_keeper("player1");
	//Max Score가 비워져 있을 경우 유저에게 값을 넣으라고 alert를 띄어준다.
})

$("#btnPlayer2").on("click", function(){
	score_keeper("player2");
	//Max Score가 비워져 있을 경우 유저에게 값을 넣으라고 alert를 띄어준다.
})

$("#btnReset").on("click", function(){
	reset();
})

$("#btnNewScore").on("click", function(){
	reset();
	max_score = $("input[type='number']").val();
	$("#max_score").text(max_score);
	$("input[type='number']").val("");
})

function score_keeper(player){
	var player_score_selector = "#" + player + "_score";
	var player_score = parseInt($(player_score_selector).text());
	console.log(player + " : " + player_score);
	if(player_score < max_score){
		$(player_score_selector).text(parseInt($(player_score_selector).text()) + 1);
		player_score = parseInt($(player_score_selector).text());
		if(player_score == max_score){
			winner_effect(player);
		}
	}
}

function winner_effect(winner){
	$("#container_score h2").fadeOut(500, function(){
		$("#container_score h2").replaceWith("<h2>" + "The Winner is " + winner + "</h2>");
	});
}

function reset(){

	max_score = $("input[type='number']").val();

	var raplace_html_statement = '<h2><span id="player1_score">0</span> - <span id="player2_score">0</span></h2>';		
	$("#container_score h2").fadeIn(500, function(){
		$("#container_score h2").replaceWith(raplace_html_statement);
	});
}