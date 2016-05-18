var prompt = require('prompt-sync')();

function Dilemma(){
  this.resultsArray = [];
  this.playerResponse;
  this.playerCooperate;
  this.computerResponse;
  this.computerCooperate;
}

Dilemma.prototype.askMove = function(){ //bet or stay, will add more later
  this.playerResponse = prompt("Co-operate or defect?");
  if(playerResponse === ""){
    return this.playerCooperate = true;
  } else {
    return this.playerCooperate = false;
  }

}

Dilemma.prototype.roboMove = function(){ //bet or stay, will add more later

  if(){
    return this.computerCooperate = true;
  }else {
    return this.computerCooperate = false;
  }

}

Dilemma.prototype.results = function(){
  if((this.playerCooperate === true)&&(this.computerCooperate === true)){

  }else if ((this.playerCooperate === true)&&(this.computerCooperate === false)) {

  }else if ((this.playerCooperate === false)&&(this.computerCooperate === true)) {

  }else{

  }

}

Dilemma.prototype.reset = function(){
  this.resultsArray = [];
  this.playerResponse;
  this.playerCooperate;
  this.computerResponse;
  this.computerCooperate;
}

Dilemma.prototype.changeState = function(){ //changes values of cooperating & betraying


var newDilemma = new Dilemma();
