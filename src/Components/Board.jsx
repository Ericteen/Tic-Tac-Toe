import React from 'react'
import Square from './Square.jsx'

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={this.props.winnerLine.includes(i)}
      />
    );
  }

  render() {
    let wrapper = []
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = 3 * i; j < 3 * (i + 1); j++) {
        row.push(this.renderSquare(j))
      }
      wrapper.push(<div className="border-row" key={i}>{row}</div>)
    }
    return (
      <div>
        {wrapper}
      </div>
    );
  }
}