/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  const iterator = function(n, row) {
    if (row === n) {
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      } else {
        iterator(n, row + 1);
      }
    }
  };

  iterator(n, 0);

  var solution = board.rows();

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  const iterator = function(n, row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      } else {
        iterator(n, row + 1);
        board.togglePiece(row, col);
      }
    }
  };
  iterator(n, 0);

  // for (var i = n; i > 0; i--) {
  //   solutionCount *= i;
  // }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solutionFound = false;
  const iterator = function(n, row) {
    if (row === n) {
      var numPieces = _.reduce(board.rows(), function(memo, row) {
        return memo + _.reduce(row, function(memo, col) {
          return memo + col;
        }, 0);
      }, 0);
      if (numPieces === n) {
        solutionFound = true;
      }
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, col);
      } else {
        iterator(n, row + 1);
        if (solutionFound === true) {
          return board.rows();
        }
        board.togglePiece(row, col);
      }
    }
  };

  iterator(n, 0);
  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  const iterator = function(n, row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, col);
      } else {
        iterator(n, row + 1);
        board.togglePiece(row, col);
      }
    }
  };
  iterator(n, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
