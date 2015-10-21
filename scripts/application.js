$(document).ready(function() {
  TicTacToe.app.init();
});
        //TicTacToe contains objects app, data, and dom
        var TicTacToe = {
            app: {
                //initialize data and screen - clear before starting game
                init: function() {
                    TicTacToe.data.initValues();
                    TicTacToe.dom.initView();
                },

                //takes board positions from data object and updates screen
                //asks for image url for each value in the array
                //render calls addImageToBoard for each value in data
                render: function() {
                  console.log('render runs');
                  for (var i = 0; i < TicTacToe.data.board.length; i++) {
                    var url = TicTacToe.data.getImage(i);
                    addImageToBoard(id, url);
                  }
                },

                //show the correct image and validate if win
                squareClickedOn: function(id) {
                  console.log('squareClickedOn runs');
                  //put the correct image into the square
                  if (TicTacToe.data.isSquareEmpty(id)) {
                      TicTacToe.data.addPieceToSquare(id);
                      this.render();
                      this.checkForWin();
                  };
                },

                //check if victory, if yes, display win and new game button
                checkForWin: function() {
                  console.log('checkForWin runs');
                  if (this.isWin()) {
                    TicTacToe.dom.displayWin(TicTacToe.data.checkWhoseTurn());
                    TicTacToe.dom.showNewGameButton();
                  }
                },

                  //checks whether there is a winner
                  isWin: function() {
                    console.log('isWin runs');
                    var piece = TicTacToe.data.checkWhoseTurn();
                    var winFlag = false;

                    _.each(TicTacToe.data.winningPositions, function (setOfThree){
                      var playerSetOfThree = _.map(setOfThree, function(item){
                        if (item){
                          return piece;
                        }

                      });
                      
                      if (_.intersection(TicTacToe.data.board, playerSetOfThree).length === 3){
                        winFlag = true;
                      }
                    });
                    return winFlag;
                }
              },

               //data stores image file paths, board positions, turn count,
                //and methods init, checkWhoseTurn, isSquareEmpty, and getImage
                data: {
                    xImage: 'img/x.jpg',
                    oImage: 'img/o.jpeg',
                    board: [],
                    turn: 0,
                    winningPositions:  [[1, 1, 1, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 1, 1, 1, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 1, 1, 1],
                                        [1, 0, 0, 1, 0, 0, 1, 0, 0],
                                        [0, 1, 0, 0, 1, 0, 0, 1, 0],
                                        [0, 0, 1, 0, 0, 1, 0, 0, 1],
                                        [1, 0, 0, 0, 1, 0, 0, 0, 1],
                                        [0, 0, 1, 0, 1, 0, 1, 0, 0]]
                    ,

                //reset turn count and clear board data
                initValues: function() {
                  console.log('initValues runs');
                  turn = 0;
                  board = [];
                },
                //checks that square is empty
                isSquareEmpty: function(id) {
                  console.log("isSquareEmpty runs")
                  if (typeof board[id] === 'undefined') {
                    return true;
                  } else {
                    return false;
                  }
                },

                //returns X or O depending on whose turn it is
                checkWhoseTurn: function() {
                  console.log('checkWhoseTurn runs');
                  if (turn % 2 === 0) {
                    return 'x';
                  } else {
                    return 'o';
                  }
                },
                //updates board data array with piece and increment turn
                addPieceToSquare: function(id){
                  console.log('addPieceToSquare runs');
                  turn++;
                  board[id] = this.checkWhoseTurn();
                },
                //fetches image of x or o based on whose turn it is
                getImage: function(id) {
                  console.log("getImage runs");
                  if (board[id] === 'x') {
                    return xImage;
                  } else {
                    return oImage;
                  }
                }
              },

              //performs actions to retrieve dom elements and show dom elements
              dom: {
                //reset view to start new game.
                initView: function() {
                  console.log('initView runs');
                  //clear all squares
                  $('.square').innerHTML = '';
                  //hide new game button on page load
                  $('#newGame').addClass('invisible');
                  //initializ new game when new game button is clicked
                  $('#newGame').click(function() {
                    TicTacToe.app.init();
                  }),
                  //set click listeners on square
                  $('.square').click(function(event) {
                    TicTacToe.app.squareClickedOn(event.target.id);
                  });
                },

                //adds the imageurl as an image tag to the div that is passed in
                addImageToBoard: function(id, imageURL) {
                  console.log("addImageToBoard runs");
                //check if elem already has image, return (don't place twice)
                var currentSquare = $('#'+id);
                  if (currentSquare.innerHTML === '') {
                    currentSquare.html('<img src="' + TicTacToe.data.getImage() + '">');
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
              }
            };
