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
                  //put the correct image into the square
                  if (TicTacToe.data.isSquareEmpty(id)) {
                      TicTacToe.data.addPieceToSquare(id);
                      var url = TicTacToe.data.getImage(id);
                      TicTacToe.dom.addImageToBoard(id, url);
                      this.checkForWin();
                  };
                },

                //check if victory, if yes, display win and new game button
                checkForWin: function() {
                  console.log('checkForWin runs');
                  if (this.isWin()) {
                    console.log('there is a win');
                    TicTacToe.dom.displayWin(TicTacToe.data.checkWhoseTurn());
                    TicTacToe.dom.showNewGameButton();
                  }
                },

                  //checks whether there is a winner
                  isWin: function() {
                    console.log('isWin runs');
                    var piece = TicTacToe.data.checkWhoseTurn();
                    var winFlag = false;
                    _.each(TicTacToe.data.winningPositions, function (array) {
                        var count = 0;
                        for (var i = 0; i < array.length; i++) {
                          if (TicTacToe.data.board[array[i]] === piece){
                            count++;
                            if (count === 3){
                              winFlag = true;
                            }
                          }
                        }
                      })
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
                    winningPositions:     [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                           [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                           [0, 4, 8], [2, 4, 6]],

                //reset turn count and clear board data
                initValues: function() {
                  console.log('initValues runs');
                  this.turn = 0;
                  for (var i = 0; i < 9; i++) {
                    this.board.push('e');
                  }
                },
                //checks that square is empty
                isSquareEmpty: function(id) {
                  console.log("isSquareEmpty runs")
                  if (this.board[id] === 'e') {
                    console.log('empty')
                    return true;
                  } else {
                    return false;
                  }
                },

                //returns X or O depending on whose turn it is
                checkWhoseTurn: function() {
                  console.log('checkWhoseTurn runs');
                  if (this.turn % 2 === 0) {
                    return 'x';
                  } else {
                    return 'o';
                  }
                },
                //updates board data array with piece and increment turn
                addPieceToSquare: function(id){
                  console.log('addPieceToSquare runs');
                  this.turn++;
                  this.board[id] = this.checkWhoseTurn();
                  console.log(this.board);
                },
                //fetches image of x or o based on whose turn it is
                getImage: function(id) {
                  console.log("getImage runs");
                  if (this.board[id] === 'x') {
                    return this.xImage;
                  } else if (this.board[id]==='o') {
                    return this.oImage;
                  } else return;
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
                    TicTacToe.app.renderImage(event.target.id);
                  });
                },

                //adds the imageurl as an image tag to the div that is passed in
                addImageToBoard: function(id, imageURL) {
                  console.log("addImageToBoard runs");
                //check if elem already has image, return (don't place twice)
                var currentSquare = $('#'+id);
                  if (currentSquare.innerHTML === undefined) {
                    currentSquare.html('<img src="' + imageURL + '">');
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
