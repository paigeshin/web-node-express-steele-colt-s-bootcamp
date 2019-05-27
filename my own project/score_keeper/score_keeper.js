// 1. 스코어를 올린다. (Player one, player two 버튼을 누를 때마다..) - 완료
// 2. max_score를 지정한다. - 완료
// 3. 위너일 때 효과를 준다. - 완료
// 4. Reset Button을 만든다. - 완료
// 5. 값을 재설정하게 한다.

var player1_score_selector = document.querySelector("#player1_score");
var player2_score_selector  = document.querySelector("#player2_score");
var btnPlayer1_selector = document.querySelector("#btnPlayer1");
var btnPlayer2_selector = document.querySelector("#btnPlayer2");
var max_score_selector = document.querySelector("#max_score");
var btnReset_selector = document.querySelector("#btnReset");
var input_selector = document.querySelector("input[type='number']");
var btnApply_selector = document.querySelector("#btnApply");

var max_score = max_score_selector.textContent; //맨처음 max_score의 값.
var gameOver = false; //게임이 진행할 조건과 진행하지 않을 조건을 구현하기 위해 넣은 변수.

btnPlayer1.addEventListener("click", function(){

	console.log(player1_score_selector.textContent);
	console.log(max_score);

	if(!gameOver){
		if(player1_score_selector.textContent < max_score){
			player1_score_selector.textContent++;
			if(player1_score_selector.textContent == max_score){
				player1_score_selector.classList.add("winner");
				gameOver = true;
			}
		} 
		else {
			gameOver = true;
		}
	}
});

btnPlayer2.addEventListener("click", function(){

	console.log(player2_score_selector.textContent);
	console.log(max_score);

	if(!gameOver){
		if(player2_score_selector.textContent < max_score){
			player2_score_selector.textContent++;
			if(player2_score_selector.textContent == max_score){
				player2_score_selector.classList.add("winner");
				gameOver = true;
			}
		} 
		else {
			gameOver = true;
		}
	}
});

btnApply_selector.addEventListener("click", function(){
	player1_score_selector.textContent = 0;
	player2_score_selector.textContent = 0;
	max_score_selector.textContent = input_selector.value;
	max_score = Number(max_score_selector.textContent); //아마 여기서 숫자가 아니라 text로 받아서 그런듯?
	player1_score_selector.classList.remove("winner");
	player2_score_selector.classList.remove("winner");
	gameOver = false;

	console.log(max_score);
});

btnReset_selector.addEventListener("click", function(){
	reset();
});

function reset(){
	player1_score_selector.textContent = 0;
	player2_score_selector.textContent = 0;
	max_score_selector.textContent = 0;
	max_score = max_score_selector.textContent;
	player1_score_selector.classList.remove("winner");
	player2_score_selector.classList.remove("winner");
	gameOver = false;
}