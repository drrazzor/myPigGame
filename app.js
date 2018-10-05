	/*
	GAME RULES:

	- The game has 2 players, playing in rounds
	- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
	- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
	- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
	- The first player to reach 100 points on GLOBAL score wins the game

	*/


	var gamePlaying, diceNum;
	init();


	document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
	// generate random number
	var dice =Math.floor((Math.random() * 6) + 1);
	console.log("dice value "+dice+" diceNum value " + diceNum);
	if(dice == 6 && diceNum == 6){
		roundScore = 0;
		scores[activePlayer] = 0;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		console.log("Rolled 6 twice.. Player back to score Zero. Swithing players");
		nextPlayer();
		//Update the round score if the rolled number IS NOT A 1.
	}else if(dice == 1){
		console.log("Rolled a 1.. Switching player");
		roundScore = roundScore + dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		nextPlayer();
	}
		
	else{		
		diceNum = dice;
		// Display result in CURRENT Score
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';    // displaying dice again which was hid previously
		diceDOM.src = 'dice-' + dice + '.png';

		//Addscore
		roundScore = roundScore + dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;

		
		
	}//endElse
}//if(gameplaying)

	});  //function() is set as an anonymous function because its only going be used in this particular case. Other way to set are callback functions




	document.querySelector('.btn-hold').addEventListener('click', function(){
	console.log("Clicked on HOLD");
	if(gamePlaying){
			//Add the current score to players global score
			scores[activePlayer] = scores[activePlayer] + roundScore;

		//update UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		

		//Check if player won the game
		console.log("Checking Winner...");
		checkWinner(activePlayer, scores[activePlayer]);
		console.log("No Winner found");

		//Next player
		nextPlayer();
		
	}

	});



	function nextPlayer(){
		
		//Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;	//ternary operator  (same as if else but simple if statemt)
		roundScore = 0;
		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';

		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');

		document.querySelector('.player-0-panel').classList.toggle('active');   //inverts the state
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.querySelector('.dice').style.display = 'none';

	}


	document.querySelector('.btn-new').addEventListener('click',init);   //passing func name [init] when clicked on New game



	function init() {
		scores=[0,0];
		activePlayer = 0;
		roundScore = 0;	
		diceNum = 0;

		gamePlaying = true;
		// Dice value not displayed at the beginning of the game
		document.querySelector('.dice').style.display = 'none';


	// Setting all the scores to zero at the beginning of the game

	document.getElementById('score-0').textContent='0';   // can be done using queryselector as well.
	document.getElementById('score-1').textContent='0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';


	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	}

	function checkWinner(activePlayer, score){
		//Check if player won the game
		console.log("Active Player "+ activePlayer + " score " + score);

		if(scores[activePlayer] >= 20 ){
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
			
			gamePlaying = false;
			console.log("We have a winner!!");

	}
}









	// document.querySelector('#current-' + activePlayer).textContent = dice 		//setter
	//var x = document.querySelector('#current-' + activePlayer).textContent;    //getter
	//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'   //add html content instead of textContent
