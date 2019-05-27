//1. 버튼으로 스코어 올라가는 것
//2. 제한주기 (var gameOver)
//3. winner 초록색 주기
//4. reset button - reset
//5. reset button - start again 
//6. insert new value - "change" rather than "click"
//7. refactor

//1. 버튼으로 스코어 올리기
//(1) player1, player2의 버튼에 접근하는 변수, score_player1, score_player2 점수에 접근하는 변수  
//(2) 버튼을 누를 때마다 스코어가 올라감 

//2. 제한주기 
//(1) gameOver 변수 추가
//(2) playingCounter라는 변수 추가. 초기값은 5
 
//3. 승자에게 초록색 주기 
//(1) classList.toggle
//(2) style sheet에 winner 클래스 정의. 

//4. reset버튼 넣기, 5. startAgain 
//(1) reset button 가져오기
//(2) 모든 값을 초기화해주는 코드 작성 

//6. insert new value 
//(1) input에 addEventListener change
//(2) 변수 score 가져오기. 


var btnPlayer1 = document.getElementById("btnPlayer1");
var btnPlayer2 = document.getElementById("btnPlayer2");
var btnReset = document.getElementById("btnReset");

var score_player1 = document.getElementById("score_player1");
var score_player2 = document.getElementById("score_player2");
var getInputNumber = document.querySelector("input[type='number']");
var max_score = document.getElementById("score");

var gameOver = false;
var playingCounter = max_score.textContent;

btnPlayer1.addEventListener("click", function(){		
	if(!gameOver && score_player1.textContent < playingCounter){
		score_player1.textContent++;
		if(score_player1.textContent == playingCounter){
			gameOver = true;
			score_player1.classList.toggle("winner");
		}
	}
});

btnPlayer2.addEventListener("click", function(){
	if(!gameOver && score_player2.textContent < playingCounter){
		score_player2.textContent++;
		if(score_player2.textContent == playingCounter){
			gameOver = true;
			score_player2.classList.toggle("winner");
		}
	}
});

btnReset.addEventListener("click", function(){
	power_reset();
});

getInputNumber.addEventListener("change", function(){
	max_score.textContent = getInputNumber.value;
	playingCounter = Number(max_score.textContent); //디버깅의 핵심코드
	power_reset();
});

function power_reset(){
	score_player1.textContent = 0;
	score_player2.textContent = 0;
	score_player1.classList.remove("winner");
	score_player2.classList.remove("winner");
	gameOver = false;
}