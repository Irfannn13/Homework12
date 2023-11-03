import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = React.useState('X');

  // Menambahkan state untuk nextValue, winner, dan status
  const [nextValue, setNextValue] = React.useState('X');
  const [winner, setWinner] = React.useState(null);
  const [status, setStatus] = React.useState(calculateStatus(winner, squares, nextValue));

  function selectSquare(square) {
    // Jika kotak sudah diisi atau permainan sudah selesai, keluar dari fungsi
    if (squares[square] || winner) {
      return;
    }

    // Buat salinan baru dari array squares
    const newSquares = [...squares];
    newSquares[square] = currentPlayer;

    // Periksa apakah ada pemenang setelah mengisi kotak
    const newWinner = calculateWinner(newSquares);

    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    // Update nextValue, winner, dan status
    const newNextValue = calculateNextValue(newSquares);
    setNextValue(newNextValue);
    setWinner(newWinner);
    const newStatus = calculateStatus(newWinner, newSquares, newNextValue);
    setStatus(newStatus);
  }

  function restart() {
    // Mengatur ulang papan permainan menjadi kosong
    setSquares(Array(9).fill(null));
    // Mengatur giliran pemain pertama
    setCurrentPlayer('X');
    // Mengatur ulang nextValue, winner, dan status
    setNextValue('X');
    setWinner(null);
    setStatus(calculateStatus(null, Array(9).fill(null), 'X'));
  }

  function renderSquare(i) {
    return (
      <button p={4} m={1} size="lg" fontSize="2xl" className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>Status: {status}</div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}


function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
