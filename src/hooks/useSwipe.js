export const createEmptyBoard = (size) => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));
};

export const getEmptyPositions = (board) => {
  const positions = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        positions.push([i, j]);
      }
    });
    
  });
  return positions;
};

export const addRandomTile = (board) => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;
  const [row, col] =
    emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = value;
  return newBoard;
};

export const initializeGame = (size) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);

  return {
    board,
    score: 0,
    gameOver: false,
    gameWon: false,
  };
};

const slideAndMergeRow = (row) => {
  const filtered = row.filter((cell) => cell !== 0);
  const merged = [];
  let scoreGained = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      merged.push(mergedValue);
      scoreGained = scoreGained + mergedValue;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i += 1;
    }
  }

  while (merged.length < row.length) {
    merged.push(0);
  }
  return { row: merged, scoreGained };
};

const rotateBoard = (board) => {
  const size = board.length;
  const rotated = createEmptyBoard(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - 1 - j] = board[i][j];
    }
  }
  return rotated;
};

const flipBoard = (board) => {
  return board.map((row) => [...row].reverse());
};

export const moveBoard = (board, direction) => {
  let workingBoard = board.map((row) => [...row]);
  let scoreGained = 0;

  switch (direction) {
    case "up":
      workingBoard = rotateBoard(rotateBoard(rotateBoard(workingBoard)));
      break;
    case "down":
      workingBoard = rotateBoard(workingBoard);
      break;
    case "right":
      workingBoard = flipBoard(workingBoard);
      break;
    case "left":
      break;
  }

  const result = workingBoard.map((row) => {
    const { row: newRow, scoreGained: gained } = slideAndMergeRow(row);
    scoreGained += gained;
    return newRow;
  });
  switch (direction) {
    case "up":
      workingBoard = rotateBoard(result);
      break;
    case "down":
      workingBoard = rotateBoard(rotateBoard(rotateBoard(result)));
      break;
    case "right":
      workingBoard = flipBoard(result);
      break;
    case "left":
      workingBoard = result;
      break;
  }

  return { board: workingBoard, scoreGained };
};

export const boardsEqual = (board1, board2) => {
  return JSON.stringify(board1) === JSON.stringify(board2);
};

export const hasWon = (board) => {
  return board.some((row) => row.some((cell) => cell === 2048));
};

export const canMove = (board) => {
  if (getEmptyPositions(board).length > 0) return true;

  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const current = board[i][j];
      if (j < size - 1 && current === board[i][j + 1]) return true;
      if (i < size - 1 && current === board[i + 1][j]) return true;
    }
  }
  return false;
};

export const processMove = (gameState, direction) => {
  if (gameState.gameOver || gameState.gameWon) return gameState;

  const { board: movedBoard, scoreGained } = moveBoard(
    gameState.board,
    direction
  );

  if (boardsEqual(gameState.board, movedBoard)) {
    return gameState;
  }

  const newBoard = addRandomTile(movedBoard);
  const newScore = gameState.score + scoreGained;
  const won = hasWon(newBoard);
  const canContinue = canMove(newBoard);

  return {
    board: newBoard,
    score: newScore,
    gameOver: !canContinue,
    gameWon: won,
  };
};
