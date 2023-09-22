import { FC, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const winnerPosition = [
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
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winnerBoard, setWinnerBoard] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const [juegoFinalizado, setJuegoFinalizado] = useState<boolean>(false);
  const handleClose = () => setShow(false);

  const reset = () => {
    setPlayer('X');
    setShow(false);
    setBoard(Array(9).fill(null));
    setJuegoFinalizado(false);
    setWinnerBoard([]);
  }

  const checkWinner = (newBoard: any[]) => {
    for (let i = 0; i < winnerPosition.length; i++) {
      const [a, b, c] = winnerPosition[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        endgame([newBoard[a], winnerPosition[i]]);
        setShow(true);
        setJuegoFinalizado(true);
      }
    }
  }

  const endgame = (winnerPosition: Array<number>) => {
    setPlayer("");

    setWinnerBoard(winnerPosition as React.SetStateAction<never[]>);
  }


  const handleClick = (index: number) => {
    console.log(index);
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const renderCell = (index: number) => {
    return (
      <Button
        variant="outline-primary"
        className="cell"
        onClick={() => handleClick(index)}
        disabled={juegoFinalizado}
      >
        {board[index]}
      </Button>
    );
  };

  return (
    <Container className="mt-5 text-center">
      <h1>TRIKI</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="board">
            {renderCell(0)}
            {renderCell(1)}
            {renderCell(2)}
            {renderCell(3)}
            {renderCell(4)}
            {renderCell(5)}
            {renderCell(6)}
            {renderCell(7)}
            {renderCell(8)}
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>El ganador es {winnerBoard[0]}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={reset}>Volver a jugar</Button>
        </Modal.Footer>
      </Modal>
      <button onClick={reset} className='mt-5 btn btn btn-outline-danger'>REINICIAR</button>

    </Container>
  );
}

export default App;