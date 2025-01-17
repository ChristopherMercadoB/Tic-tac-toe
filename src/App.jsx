import { useState } from "react";
import "./App.css";

const TURNS = {
  x: "x",
  o: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  const handleReset = () => {
    setBoard(() => Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;

    setTurn(newTurn);

    const newWinner = checkWin(newBoard);
    if (newWinner != null) {
      setWinner(newWinner);
    }
  };

  const checkWin = (boardToCheck) => {

    let counter;

    boardToCheck.forEach(element => {
      if(element == null){
          counter+=1
      }
    });
    for (const combo of winCombos) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }  else if(counter == null && boardToCheck[a] &&
        boardToCheck[a] != boardToCheck[b] &&
        boardToCheck[a] != boardToCheck[c]){
          return false;
      }
      }
    return null;

    }

  

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                children={board[index]}
              />
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.x} children={TURNS.x} />
          <Square isSelected={turn === TURNS.o} children={TURNS.o} />
        </section>
        {winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Empate" : "Gano"}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={handleReset}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
