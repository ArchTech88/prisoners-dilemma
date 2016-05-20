// defaultPayouts here are not tied to the table displayed, must be edited separately
var defaultPayouts = [
	[ [ 20 , 20 ] , [ 0 , 30 ] ],
	[ [ 30 , 0 ] , [ -10 , -10 ] ],
];
// results display requires TOTALROUNDS >= TOTALOPPONENTS+2
// Easy to fix later
var TOTALROUNDS = 15; //default is 15
var TOTALOPPONENTS = 5; //default is 5



function inputDefaultValues(){
	var o11val = parseInt($('#o11').text(defaultPayouts[0][0]));
	var o10val = parseInt($('#o10').text(defaultPayouts[0][1]));
	var o01val = parseInt($('#o01').text(defaultPayouts[1][0]));
	var o00val = parseInt($('#o00').text(defaultPayouts[1][1]));
	$('#o11').append(o11val);
	$('#o10').append(o10val);
	$('#o01').append(o01val);
	$('#o00').append(o00val);
}

function inputCustomValues(textbox){
	var newVals = $(textbox).val().split(",").map(function(element){
		return parseInt(element.trim());
	});
	console.log(newVals);
	switch ($(textbox).attr("name")){
		case "o11":
			defaultPayouts[0][0] = newVals;
		break;
		case "o01":
			defaultPayouts[1][0] = newVals;
		break;
		case "o10":
			defaultPayouts[0][1] = newVals;
		break;
		case "o00":
			defaultPayouts[1][1] = newVals;
		break;
	}
	$(textbox).prev().html(newVals.join(","));
}

window.onload = function(){inputDefaultValues();};

function changePayouts(){

	var o11val = parseInt($('#o11').text(defaultPayouts[0][0]));
	var o10val = parseInt($('#o10').text(defaultPayouts[0][1]));
	var o01val = parseInt($('#o01').text(defaultPayouts[1][0]));
	var o00val = parseInt($('#o00').text(defaultPayouts[1][1]));
	$('#o11').append(o11val);
	$('#o10').append(o10val);
	$('#o01').append(o01val);
	$('#o00').append(o00val);
}

function addPayouts(){
	var o11val = parseInt($('#o11').text(defaultPayouts[0][0]));
	var o10val = parseInt($('#o10').text(defaultPayouts[0][1]));
	var o01val = parseInt($('#o01').text(defaultPayouts[1][0]));
	var o00val = parseInt($('#o00').text(defaultPayouts[1][1]));
	$('#o11').append(o11val);
	$('#o10').append(o10val);
	$('#o01').append(o01val);
	$('#o00').append(o00val);
}

function changeTotalRounds() {
     TOTALROUNDS = parseInt(prompt("Tell me how many rounds you would like to play:"));
		//  while (typeOf(TOTALROUNDS) !== "number"){
		// 	 alert("That's not a number.");
		// 	 TOTALROUNDS = parseInt(prompt("Tell me how many rounds you would like to play:"));
		//  }
		 var str = '';
		 $('.totals').remove();
		 for(var i = 1; i<= TOTALROUNDS; i++) {
			 str += "<tr id='totals' class='totals'><td>"+i+"</td><td></td><td></td></tr>";
		 }
		 str +=  "<tr class='totals'><th>Average</th><th></th><th></th></tr>";
		//$("totals").remove();
		resetGame();
		$('#PDresult').append(str);
}

var opponent = 0;
var round;
var state; // 2 is cooperative, 0 is not, 1 is TF2T
var strategy;
var oppStrategy;
var totalPay;
var oppTotalPay;
var roundPayout = [];
var opponentRoundPayout = [];
var finalPay = 0;
var oppFinalPay = 0;
var myRow;

resetOpponent();

function cooperate(){
	strategy = 1;
	finishRound();
}
function defect(){
	strategy = 0;
	finishRound();
}

function resetGame() {
	round = 1;
	state = 2;
	totalPay = 0;
	oppTotalPay = 0;
	opponent = 1;

	if (opponent > 0) {
		var opponentName = document.getElementById('opponentName');
		opponentName.innerHTML = "Opponent " + opponent;
		var status = document.getElementById('status');
		status.innerHTML = "";
		status = document.getElementById('status2');
		status.innerHTML = "";
		resetHighlight();
		var myTable = document.getElementById('PDresult');
		for (var i = 1; i < myTable.rows.length; i++){
			var myRow = myTable.rows[i];
			myRow.cells[1].innerHTML = "";
			myRow.cells[2].innerHTML = "";
			document.getElementById('bCooperate').disabled = false;
			document.getElementById('bDefect').disabled = false;
		}
	}
}

function showScores(){
	var myTable = document.getElementById('PDresult');
	for (var j = 1; j < myTable.rows.length; j++){
		myRow = myTable.rows[j];
		myRow.cells[0].innerHTML = "";
		myRow.cells[1].innerHTML = "";
		myRow.cells[2].innerHTML = "";
	}
	myTable.rows[0].cells[0].innerHTML = "Opponent number";

	for (var i = 0; i < roundPayout.length; i++) {
		finalPay += roundPayout[i];
		oppFinalPay += opponentRoundPayout[i];
	}

	finalPay = Math.round(10*finalPay)/10;
	oppFinalPay = Math.round(10*oppFinalPay)/10;


  for (r = 0; r < TOTALOPPONENTS; r++){
    myRow = myTable.rows[r + 1];
    myRow.cells[0].innerHTML = r + 1;
    myRow.cells[1].innerHTML = roundPayout[r];
    myRow.cells[2].innerHTML = opponentRoundPayout[r];
    myRow.cells[0].style.fontWeight = "bold";
    myRow.cells[1].style.fontWeight = "bold";
    myRow.cells[2].style.fontWeight = "bold";
  }

  	myRow = myTable.rows[TOTALOPPONENTS + 1];
  	myRow.cells[0].innerHTML = "&nbsp;";

  	myRow = myTable.rows[TOTALOPPONENTS + 2];
  	myRow.cells[0].innerHTML = "Total";
  	myRow.cells[1].innerHTML = finalPay;
  	myRow.cells[2].innerHTML = oppFinalPay;
  	myRow.cells[0].style.fontWeight="bold";
  	myRow.cells[1].style.fontWeight="bold";
  	myRow.cells[2].style.fontWeight="bold";
  	myRow.cells[0].style.color="red";
  	myRow.cells[1].style.color="red";
  	myRow.cells[2].style.color="red";
}

function submitgame(){
	var resultstring=roundPayout.toString() + "X" + opponentRoundPayout.toString();
	resultstring += "XXXX" + finalPay + "X" + oppFinalPay;
	document.myForm.answer.value = resultstring;
	document.myForm.submit();
} //I don't know why this is here


function resetOpponent() {
	round = 1;
	state = 2;
	totalPay = 0;
	oppTotalPay = 0;
	opponent++;

	if (opponent > 1) {
		var opponentName = document.getElementById('opponentName');
		opponentName.innerHTML = "Opponent " + opponent;
		var status = document.getElementById('status');
		status.innerHTML = "";
		status = document.getElementById('status2');
		status.innerHTML = "";
		resetHighlight();
		var myTable = document.getElementById('PDresult');
		for (var i = 1; i < myTable.rows.length; i++){
			var myRow = myTable.rows[i];
			myRow.cells[1].innerHTML = "";
			myRow.cells[2].innerHTML = "";
			document.getElementById('bCooperate').disabled = false;
			document.getElementById('bDefect').disabled = false;
		}
	}
}

function finishRound(){
	// calculate opp strategy from previous state, then update state

  switch (opponent) {
	case 1: // Tit-for-tat
		oppStrategy = (state > 0) ? 1 : 0;
		state = 2 * strategy;
		break;
	case 2: // Tit-for-tat
		oppStrategy = (state > 0) ? 1 : 0;
		state = strategy ? 2 : Math.max(0, state - 1);
		break;
	case 3: // GTS
		oppStrategy = (state > 0) ? 1 : 0;
		state = state*strategy;
		break;
	case 4: // random
		oppStrategy = (Math.random() > 0.5)? 1 : 0;
		break;
	case 5: // troll, always defect
		oppStrategy = 0;
		break;
	default: // Tit-for-tat
		oppStrategy = (state > 0) ? 1 : 0;
		state = 2*strategy;
		break;
  }
	strategyName    =    strategy ? " cooperate" : " defect" ;
	oppStrategyname = oppStrategy ? " cooperate" : " defect" ;
	pay = defaultPayouts[1-strategy][1-oppStrategy][0];
	oppPay = defaultPayouts[1-strategy][1-oppStrategy][1];
	totalPay += pay;
	oppTotalPay += oppPay;

	// highlight game outcome
	highlightResult('o' + strategy + oppStrategy);

	// update result table
	var myTable = document.getElementById('PDresult');
	var myRow = myTable.rows[round];
	myRow.cells[1].innerHTML = pay;
	myRow.cells[2].innerHTML = oppPay;
	myRow = myTable.rows[myTable.rows.length-1];
	myRow.cells[1].innerHTML = "" + Math.round(10*totalPay/round)/10;
	myRow.cells[2].innerHTML = "" + Math.round(10*oppTotalPay/round)/10;


	// update status
	var status = document.getElementById('status');
	status.innerHTML = "You chose to" + strategyName + "<br />Your opponent chose to" + oppStrategyname;
	round++;
	if (round > TOTALROUNDS) {
		round--;
		roundPayout.push(Math.round(10*totalPay/round)/10);
		opponentRoundPayout.push(Math.round(10*oppTotalPay/round)/10);
		if (opponent === TOTALOPPONENTS) {
			status.innerHTML += "<br /><br /> <br />A summary of your performance appears to the right.";
			showScores();
		} else {
			status = document.getElementById('status2');
			status.innerHTML += "<br /><br />When you are ready for your next opponent,<br />click below";
			status.innerHTML += "<br /><input type=\"button\" value=\"Next Opponent\" onclick=\"resetOpponent();\" \\>";
		}
		document.getElementById('bCooperate').disabled = true;
		document.getElementById('bDefect').disabled = true;
	}
}


function highlightResult(o){
	resetHighlight();
	var outcome = document.getElementById(o);
	outcome.style.backgroundColor = "red";
}

function resetHighlight(){
	document.getElementById('o11').style.backgroundColor = "";
	document.getElementById('o10').style.backgroundColor = "";
	document.getElementById('o01').style.backgroundColor = "";
	document.getElementById('o00').style.backgroundColor = "";
}
