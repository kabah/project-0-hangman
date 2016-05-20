// get word from wordbank-maybe use array.shift

// push into secret word

// stringify secret word

// split string using string.split

// push array of individual letters into puzzle

// create game board based on puzzle array of individual letters
// double letter words: "tremendous", "knee", "decisive" "longing", "shrill", "economic", "event", "preserve", "jellyfish" "supply",

var lettersPicked = [];
// var wordBank = [, "cat", "dog", "mouse", "tail", "caption", "debt", "hair", "rule", "wind","tremendous" "exotic" "knee", "decisive" "longing", "shrill", "economic", "event", "preserve", "jellyfish" "supply"];
var secretWord;
var answer;
var tableData;
var winCounter = 0;
var hintCounter = 10;
// var solvePuzzleClicked;
var solution;
var useHint;
var hintsLeft;
// var startSlice = 0;
// var endSlice = 1;
// var solvedWords[];

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var setTime = function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
        	 $(".letters").unbind("click");
        	 $("#points").text("Game over! You caught " + winCounter + " words!");
        	 clearInterval(interval);

        	/*game over
				-Deactivate Keys
				-Deactivate buttons
				Show Game over text
        	*/
            // timer = duration;
        }
    };

    setTime();
    interval = setInterval(setTime, 1000);
};

window.onload = function() {
	// solvePuzzleClicked = false; 
	letters = document.getElementsByClassName("letters");
	score = document.getElementById("current-score")
	newGame = document.getElementById("new-game");
	solution = document.getElementById("solve");
	useHint = document.getElementById("use-hint");
	hintsLeft = document.getElementById("hints-left")
	useHint.addEventListener("click", hint);
	solution.addEventListener("click", solve);
	$('#start-game').click(function(e){
	  e.preventDefault();
	  startTimer(120, $("#time"));	
	  activateKeys();
	  clearBoard();
	  newSecretWord();
	});
	
	// newGame.addEventListener("click", newSecretWord);
	getSecretWord();
	
};
	
function activateKeys()	{

// 	for (var alphabet =0; alphabet<letters.length; alphabet++) {
// 			letters[alphabet].addEventListener("click", pickLetter);
// 		}

		$(".letters").click(pickLetter);

		$(".letters").removeClass( "btn-danger" );
		// keys.className = "letters btn btn-default responsive-width";
};

// function resetKeys () {
// 	var keys = document.getAttribute(data-num[i])
// 	for (var k = 0; )
// }

function pickLetter() {
	lettersPicked.push(this.id);
	this.className += " btn-danger";
	// if the selected letter occurs only once
	$(this).unbind("click");
		// console.log(lettersPicked);
	checkLetter ();
	checkForWin();
	// addSlice();
};

function checkLetter(){
	var spaces = $('td');

	for (var j = 0; j < lettersPicked.length; j++) {
      var currentLetter = lettersPicked[j];
      for (var i = 0; i < spaces.length; i++) {
      	if (currentLetter == answer[i]) {
      		spaces[i].textContent=answer[i];
      		// $(spaces[i]).text(answer[i])
      	}
      }
	}



		// if (secretWord.indexOf(lettersPicked[j]) != -1  ){
		// 	var tempLetterLocation = secretWord.indexOf(lettersPicked[j]);
		// 	// console.log( lettersPicked[j] + " is in the word at index ", tempLetterLocation );
		// 	spaces[tempLetterLocation].textContent = lettersPicked[j];
		// } else {
			// console.log( lettersPicked[j] + " is not in the word");
		// }
};

function checkForWin() {
	var pointsHTML = document.getElementById("points");

	var result = result = $("td").map(function(){return this.textContent}).get().join('');
	if (result == answer.join("")) {
		// for (var i=0; i < answer.length; i++) {
		// addCellAnswer(answer[i]);
		// }
		pointsHTML.innerHTML = "You caught " + answer.join("") + "!";
		winCounter++;
		score.innerHTML = "Score: " + winCounter;
		newSecretWord();
		// startSlice = 0;
		// endSlice = 1;
		console.log(winCounter);
		// alert("you win");
	} 
	// else if (lettersPicked.length > (answer.length + 5)) {
		
	// 	pointsHTML.innerHTML = "You lost this round";
	// 	winCounter--;
	// 	console.log(winCounter);
	// }
};

// function intersect(a, b) {
// 	var c = a.slice(0);
// 	var d = b.slice(0);

// 	c.sort();
// 	d.sort();
	
//   var ci=0, di=0;
//   var result = [];

//   while( ci < c.length && di < d.length )
//   {
//      if      (c[ci] < d[di] ){ ci++; }
//      else if (c[ci] > d[di] ){ di++; }
//      else /* they're equal */
//      {
//        result.push(c[ci]);
//        ci++;
//        di++;
//      }
//   }

//   return result;
// };

function clearBoard() {
		var rmvOldWord = document.getElementById("game-board");
		var tableData = rmvOldWord.rows[0];
		while (tableData.cells.length > 0) {
		tableData.deleteCell(0);
	    		}
	    };

function newSecretWord() {
		lettersPicked = [];
		// solvePuzzleClicked = false;
		// startSlice = 0;
		// endSlice = 1;
		clearBoard();
		activateKeys();
		getSecretWord();
	};

function getSecretWord() {
	secretWord = words();
	// split = secretWord.split("");
	answer = secretWord.split("");
	logArray(answer);
	// console.log(split);
};

function logArray(answer) {
	for (var i=0; i < answer.length; i++) {
		addCellPuzzle(answer[i]);
	};
	// var tempArray = split;
	// console.log(tempArray);
		// console.log(tempArray[i]); // returns one letter at a time
};
//Thanks to Matt Laguardia and Ben Hulan for help with addCell and logArray functions!
function addCellPuzzle(letter) {
	var row = document.querySelectorAll("tr");
	var newCell = document.createElement("td");
	newCell.setAttribute("class", "secret-letter")
	newCell.innerHTML = "_";
	// newCell.innerHTML = letter;
	row[0].appendChild(newCell);
	// var elementId = document.querySelectorAll("td").length;
	// newCell.setAttribute("id", letter);

	// console.log(newCell);
	// var testWord = for (var i = 0; i<split.length; i++) {
	// 	split[i]
	// };
};

function addCellAnswer(letter) {
	var row = document.querySelectorAll("tr");
	var newCell = document.createElement("td");
	newCell.setAttribute("class", "secret-letter")
	// newCell.innerHTML = "_";
	newCell.innerHTML = letter;
	row[0].appendChild(newCell);
};
// 	solution.addEventListener("click", solve);
	
// 	function showSolution(letter) {
// 		
// 		var row = document.querySelectorAll("tr");
// 		var newCell = document.createElement("td");
// 		newCell.setAttribute("class", "secret-letter")
// 		newCell.innerHTML = letter;
// 		row[0].appendChild(newCell);
// 	}; 



function solve() {
if(winCounter > 0) {
	clearBoard();
	for (var i=0; i < answer.length; i++) {
		addCellAnswer(answer[i]);
		}
	winCounter--;
	score.innerHTML = "Score: " + winCounter;
	console.log(winCounter);
		}
	};

function hint() {
	// startSlice = 0;
	// endSlice = 1;


	if(hintCounter > 0) {
		var hintedLetter = "";
		do {
			idx = Math.floor(Math.random() * answer.length);
			hintedLetter = answer[idx]; 
		} while (lettersPicked.includes(hintedLetter));
		if (hintedLetter != "") {
		hintCounter--;
		hintsLeft.innerHTML = "Hints: " + hintCounter;
		$("#" + hintedLetter).click();
			
		}
	// console.log(hintedLetter);
	// console.log(lettersPicked);
	// console.log(hintCounter);
	checkLetter();
	}

	// addSlice();
};
// function addSlice() {
// 	startSlice++;
// 	endSlice++;
// };













