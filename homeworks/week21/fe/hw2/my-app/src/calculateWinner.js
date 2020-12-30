export default function calculateWinner(squares, currentX, currentY) {
  if (currentX === null || currentY === null) return;
  const blackOrWhite = squares[currentY][currentX];
  let winner;
  const total = (blackOrWhite, currentX, currentY, directionX, directionY) => {
    let chessInRow = 0;
    let nextX = currentX;
    let nextY = currentY;

    while (chessInRow < 5) {
      nextX += directionX;
      nextY += directionY;
      if (
        nextX < 0 ||
        nextX >= 19 ||
        nextY < 0 ||
        nextY >= 19 ||
        squares[nextY][nextX] !== blackOrWhite
      )
        break;
      chessInRow++;
    }
    return chessInRow;
  };

  if (
    total(blackOrWhite, currentX, currentY, 1, 0) +
      total(blackOrWhite, currentX, currentY, -1, 0) >=
      4 ||
    total(blackOrWhite, currentX, currentY, 0, 1) +
      total(blackOrWhite, currentX, currentY, 0, -1) >=
      4 ||
    total(blackOrWhite, currentX, currentY, 1, 1) +
      total(blackOrWhite, currentX, currentY, -1, -1) >=
      4 ||
    total(blackOrWhite, currentX, currentY, -1, 1) +
      total(blackOrWhite, currentX, currentY, 1, -1) >=
      4
  ) {
    winner = blackOrWhite;
  }
  return winner;
}
