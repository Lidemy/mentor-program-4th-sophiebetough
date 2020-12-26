import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "./calculateWinner";
import styled from "styled-components";

const GameContainer = styled.div``;

const GameTitle = styled.h1`
  color: #3b3b3b;
  font-size: 60px;
  letter-spacing: 2px;
  text-align: center;
  margin: 30px auto 10px auto;
`;

const GameInfoWrapper = styled.div`
  display: flex;
  max-width: 480px;
  margin: 0 auto;
  padding: 8px 0px;
  justify-content: space-between;
  align-items: center;
`;

const GameWinnerMessage = styled.div`
  color: #ff0f00;
  font-weight: bold;
  font-size: 1.6rem;
`;

const GamePlayerMessage = styled.div`
  color: #3b3b3b;
  font-size: 24px;
`;

const RestartButton = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  height: 2.5rem;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  background-color: #333333;
  outline: none;
  padding: 0.2rem 1.2rem;
  box-shadow: 0 0.3rem rgba(121, 121, 121, 0.7);

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    transform: translate(0, 0.3rem);
  }
`;

const Game = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [blackIsNext, setBlackIsNext] = useState(true);
  const [stepPlayed, setStepPlayed] = useState(0);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const blackOrWhite = blackIsNext ? "black" : "white";
  const winner = calculateWinner(board, currentX, currentY);

  const handleClick = (xIndex, yIndex) => {
    setCurrentX(xIndex);
    setCurrentY(yIndex);
    const boardCopy = [...board];
    // if player click an occupied square or if game is won.
    if (winner || boardCopy[yIndex][xIndex]) return;

    setBoard(
      boardCopy.map((row, currentY) => {
        if (currentY !== yIndex) {
          return row;
        }
        return row.map((color, currentX) => {
          if (currentX !== xIndex) {
            return color;
          }
          return blackOrWhite;
        });
      })
    );
    setStepPlayed(stepPlayed + 1);
    setBlackIsNext(!blackIsNext);
  };

  return (
    <>
      <GameContainer>
        <GameTitle>GOMOKU</GameTitle>
        <GameInfoWrapper>
          <GamePlayerMessage>
            Player：{blackOrWhite === "black" ? "黑子" : "白子"}
          </GamePlayerMessage>
          {winner && (
            <GameWinnerMessage>
              Winner {winner === "black" ? "黑子" : "白子"}
            </GameWinnerMessage>
          )}
          <RestartButton
            onClick={() => setBoard(Array(19).fill(Array(19).fill(null)))}
          >
            Restart
          </RestartButton>
        </GameInfoWrapper>
        <Board squares={board} onClick={handleClick} />
      </GameContainer>
    </>
  );
};

export default Game;
