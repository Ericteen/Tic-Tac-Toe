import React from 'react'
import Board from './Board.jsx'
import calculateWinner from '../utility/util.js'

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          clickedLocation: [0, 0]
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      sort: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          clickedLocation: [Math.floor(i / 3) + 1, i % 3 + 1]
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  }

  toggleSort() {
    const sort = this.state.sort
    this.setState({sort: ~sort});
  }

  render() {
    const history = this.state.history;
    const sort = this.state.sort;
    const current = history[this.state.stepNumber];
    const winnerData = calculateWinner(current.squares);
    const winner = winnerData ? winnerData.winner : null
    const winnerLine = winnerData ? winnerData.line : []

    const moves = history.map((step, move) => {
      const clickedLocation = step.clickedLocation
      const desc = move ? `Move # ${move} (${clickedLocation[0]}, ${clickedLocation[1]})` : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)} style={{fontWeight: 'bold'}}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winnerLine={winnerLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleSort()}>toggle btn</button>
          {(() => {
            return sort === 0 ? <ol>{moves}</ol> : <ol>{moves.reverse()}</ol>
          })()}
        </div>
      </div>
    );
  }
}