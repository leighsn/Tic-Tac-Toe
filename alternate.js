$(document).ready(function(){
	 //TODO: add click listeners to each square going to TicTacToe.viewModel.squareClickedOn
   $('.square').click(function() {
      TicTacToe.viewModel.squareClickedOn(this);

   });
	//TODO: add click listener to new game button going to TicTacToe.viewModel.init
}

var TicTacToe = {
model: {
	board:[],
	turn:0,
	wins: {
		player1: 0,
		player2: 0
	}
},

viewModel: {
	//clear the board prior to beginning game
  init: function(){

    	//iterate through all html squares using jquery and clear all children
      $('.square').innerHTML = '';

    	//reset turn count to 0
      this.model.turn = 0;

    	//hide new game button
      .addClass('invisible');
    },
    //checks that square is empty
    squareIsEmpty: function (id) {
      if this.model.board[id] === 'undefined' {
        return true;
      } else {
        return false;
      }
    };

	//take the values from the model
	//and update the screen
	//render wil call addImageToDiv
	//foreach value in the model
	render: function(){

  _.each(array, addImageToBoard(elem));


	},

  checkWhoseTurn: function () {
      if (model.turn % 2 === 0){
        return 'x';
      } else {
        return 'o';
      }
    },

  selectImage: function () {
    if (checkWhoseTurn() === 'x') {
      return 'img/x.jpg';
    } else {
      return 'img/o.jpeg';
    }
  },


	//show the correct image validate if win
	squareClickedOn: function(elem) {
    //put the correct image into the square using addImagetoBoard
    var id = elem.attr('id').val();
    if (squareIsEmpty(id){
      this.model.board[id] = checkWhoseTurn();
    };

	//check if victory, if yes display win and call init
  if (isWin){
    displayWin();
    init();
  }
},

	//adds the imageurl as an image tag to the div that is passed in
	addImageToBoard: function (elem) {
    //check if elem already has image, return (don't place twice)
  if(elem.innerHTML === ''){
    elem.html('<img src="' + selectImage() + '">');
  }
	},
	//checks whether there is a winner
	isWin: function() {

	},

	//displays the winning player,
	//can figure out which one based on model.turn
	displayWin:function(){
		//TODO: show alert
		//TODO: increment correct wins player total
		//TODO: enable new game button
	}

  }
