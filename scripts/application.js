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

                //accepts id of element to to be updated
                //When square is empty, fetch image and place
                //check if win

                renderImage: function(id) {
                  console.log('renderImage runs');
                  //put the correct image into the square
                  if (TicTacToe.data.isSquareEmpty(id) &&
                  TicTacToe.data.boardIsActive(TicTacToe.data.activeFlag)) {
                    //console.log("entering renderImage if statement. activeFlag is " + TicTacToe.data.activeFlag);
                      TicTacToe.data.addPieceToSquare(id);
                      var url = TicTacToe.data.getImage(id);
                      TicTacToe.dom.addImageToBoard(id, url);
                      this.checkForWin();

                  };
                },

                //check if victory, if yes, display win and new game button
                checkForWin: function() {
                  //console.log('checkForWin runs');
                  if (this.isWin()) {
                    //console.log('there is a win');
                    TicTacToe.dom.displayWin(TicTacToe.data.checkWhoseTurn());
                    TicTacToe.dom.showNewGameButton();
                  } else if (this.isStaleMate()) {
                    //console.log("There is a stalemate");
                    TicTacToe.dom.displayStaleMate();
                    TicTacToe.dom.showNewGameButton();
                  }
                },

                isStaleMate: function() {
                  if (TicTacToe.data.turn == 9 && !(this.isWin())){
                    return true;
                  } else return false;

                },

                //checks whether there is a winner
                isWin: function() {
                //console.log('isWin runs');
                  var piece = TicTacToe.data.checkWhoseTurn();
                  var winFlag = false;
                  //if current player piece is stored at all three positions in
                  //current index of winning Positions, there is a win
                  _.each(TicTacToe.data.winningPositions, function (array) {
                      if (TicTacToe.data.board[array[0]] == piece &&
                        TicTacToe.data.board[array[1]] == piece &&
                        TicTacToe.data.board[array[2]] == piece) {
                          TicTacToe.data.winningSquares = array;
                          console.log('array is ' + array);

                          winFlag = true;
                          console.log(winFlag);
                          //stop gameplay after win
                          TicTacToe.data.activeFlag = false;
                          TicTacToe.data.boardIsActive(TicTacToe.data.activeFlag);
                          //turn off board is active
                        }
                });
                  if (!winFlag){TicTacToe.data.winningSquares = [];}
                  return winFlag;

              }
            },

               //data stores image file paths, board positions, turn count,
                //and methods init, checkWhoseTurn, isSquareEmpty, and getImage
                data: {
                    xImage: 'img/x.png',
                    oImage: 'img/o.png',
                    board: [],
                    turn: 0,
                    activeFlag: true,
                    winningPositions:     [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                           [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                           [0, 4, 8], [2, 4, 6]],
                    winningSquares: [],

                //reset turn count and clear board data
                initValues: function() {
                  //console.log('initValues runs');
                  this.turn = 0;
                  this.board = [];
                  this.activeFlag = true;
                  //set default values on all squares to 'e'
                  for (var i = 0; i < 9; i++) {
                    this.board.push('e');
                  }
                },
                //checks that square is empty
                isSquareEmpty: function(id) {
                  //console.log("isSquareEmpty runs")
                  if (this.board[id] === 'e') {
                    //console.log('empty')
                    return true;
                  } else {
                    return false;
                  }
                },

                //returns X or O depending on whose turn it is
                checkWhoseTurn: function() {
                  //console.log('checkWhoseTurn runs');
                  if (this.turn % 2 === 0) {
                    return 'x';
                  } else {
                    return 'o';
                  }
                },
                //updates board data array with piece and increment turn
                addPieceToSquare: function(id){
                  //console.log('addPieceToSquare runs');
                  this.turn++;
                  this.board[id] = this.checkWhoseTurn();
                  //console.log(this.board);
                },
                //fetches image of x or o based on whose turn it is
                getImage: function(id) {
                  //console.log("getImage runs");
                  if (this.board[id] === 'x') {
                    return this.xImage;
                  } else if (this.board[id]==='o') {
                    return this.oImage;
                  } else return;
                },

                //checks if board active or not (because someone has won)
                boardIsActive: function(activeFlag){
                  //console.log('boardIsActive runs');
                  if (activeFlag){
                    return true;
                  } else return false;
                }

              },

              //retrieve and show dom elements
              dom: {
                //reset view to start new game.
                initView: function() {
                  //console.log('initView runs');
                  //clear all data on board view
                  $('.square').empty();
                  $('.square').removeClass('win');
                  $('#alert').empty();
                  //hide new game button on page load
                  $('#newGame').addClass('invisible');
                  $('#alert').addClass('invisible');
                  //initialize new game when new game button is clicked
                  $('#newGame').click(function() {
                    TicTacToe.app.init();
                  }),
                  //set click listeners on squares
                  $('.square').click(function(event) {
                    TicTacToe.app.renderImage(event.target.id);
                  });
                },

                //adds the imageurl as an image tag to the div that is passed in
                addImageToBoard: function(id, imageURL) {
                  //console.log("addImageToBoard runs");
                //check if square is empty and place image if so
                var currentSquare = $('#'+id);
                  if (currentSquare.innerHTML === undefined) {
                    currentSquare.html('<img class="center" src="' + imageURL + '">');
                  }
                },
                displayWin: function(winningPlayer) {
                  $('#alert').removeClass('invisible').text('Player ' + winningPlayer + ' won!');
                  _.each(TicTacToe.data.winningSquares, this.colorWinningSquares);
                },
                colorWinningSquares: function(item) {
                  $('#'+item).addClass('win');
                },
                displayStaleMate: function() {
                  $('#alert').removeClass('invisible').text('There is a stalemate!');
                },
                //show button to start new game.
                showNewGameButton: function() {
                  //TODO: show next game button
                  $('#newGame').removeClass('invisible');
                }
              }
            }
