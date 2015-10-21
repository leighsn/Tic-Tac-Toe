$(document).ready(function() {
  TicTacToe.app.init();
}
        //TicTacToe contains objects app, data, and dom
        TicTacToe = {
            app: {
                //initialize data and screen - clear before starting game
                init: function() {
                    TicTacToe.data.initValues();
                    TicTacToe.dom.initView();
                },

                //takes board positions from data object and updates screen
                //render calls addImageToBoard for each value in data
                render: function() {
                  //check this
                    _.each(TicTacToe.data.board, TicTacToe.dom.addImageToBoard(elem));
                },

                //show the correct image and validate if win
                squareClickedOn: function(id) {
                  //put the correct image into the square
                  if (TicTacToe.data.isSquareEmpty(id) {
                      TicTacToe.data.addPieceToSquare(id);
                      checkForWin();
                  };
                },

                //check if victory, if yes, display win and new game button
                checkForWin: function() {
                  if (isWin()) {
                    TicTacToe.dom.displayWin(TicTacToe.data.checkWhoseTurn());
                    TicTacToe.dom.showNewGameButton();
                  }
                },

                  //checks whether there is a winner
                  isWin: function() {
                    var piece = checkWhoseTurn();
                    var winFlag = false;

                    //create 2D array of winning positions marked with v and l
                    //loop through and call map and change v to piece and call intersect on each of them.
                    TicTacToe.data.winningPositions.each(function (setOfThree){
                    var playerSetOfThree = _.map(setOfThree, function(item){
                        if (item){
                          return piece;
                        }

                      });
                      if (_.intersection(TicTacToe.data.board, playerSetOfThree).length == 3){
                        winFlag = true;
                      }
                    });
                    return winFlag;
                },

               //data stores image file paths, board positions, turn count,
                //and methods init, checkWhoseTurn, isSquareEmpty, and getImage
                data: {
                    xImage: 'img/x.jpg',
                    oImage: 'img/o.jpeg',
                    board: [],
                    turn: 0,
                    winningPositions: [[1, 2, 3], [4, 5, 6]]
                    },

                //reset turn count and clear board data
                initValues: function() {
                  turn = 0;
                  board = [];
                },
                //checks that square is empty
                isSquareEmpty: function(id) {
                  if board[id] === 'undefined' {
                    return true;
                  } else {
                    return false;
                  }
                },

                //returns X or O depending on whose turn it is
                checkWhoseTurn: function() {
                  if (turn % 2 === 0) {
                    return 'x';
                  } else {
                    return 'o';
                  }
                },
                //updates board data array with piece and increment turn
                addPieceToSquare: function(id){
                  turn++;
                  board[id] = checkWhoseTurn();
                },
                //fetches image of x or o based on whose turn it is
                getImage: function() {
                  if (checkWhoseTurn() === 'x') {
                    return xImage;
                  } else {
                    return oImage;
                  }
                },

              },
              //performs actions to retrieve dom elements and show dom elements
              dom: {
                //reset view to start new game.
                initView: function() {
                  //clear all squares
                  $('.square').innerHTML = '';
                  //hide new game button on page load
                  $('#newGame').addClass('invisible');
                  //add click listener to new game button going to TicTacToe.app.init
                  $('#newGame').click(function() {
                    TicTacToe.app.init();
                  },
                  //set click listeners on square
                  $('.square').click(function(event) {
                    TicTacToe.app.squareClickedOn(event.target.id);
                  };
                },

                //adds the imageurl as an image tag to the div that is passed in
                addImageToBoard: function(elem) {
                //check if elem already has image, return (don't place twice)
                  if (elem.innerHTML === '') {
                    elem.html('<img src="' + TicTacToe.data.getImage() + '">');
                  }
                },
                displayWin: function(winningPlayer) {
                  alert("Player " + winningPlayer + " won!");
                },
                //show button to start new game. Is called
                showNewGameButton: function() {
                  //TODO: show next game button
                  $('#newGame').addClass('visible');
                }
