import React from 'react'

export default function Square(props) {
  if (props.highlight) {
    return (
      <button className='square' onClick={props.onClick} style={{color: '#14bdac'}}>
        {props.value}
      </button>
      )
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
}