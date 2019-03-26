import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'

export class Grid extends Component {
  state = {
    previousProps: {},
    dragging: false,
    draggedElement: undefined,
    position: {},
  }

  onMouseMove = e => {
    if (!this.state.dragging) return
    this.setState({ position: { x: e.clientX, y: e.clientY } })
  }

  onMouseDown = index => e => {
    this.setState({ dragging: true, draggedElement: index })
  }

  onMouseUp = index => e => {
    this.setState({ dragging: false, draggedElement: index, position: {} })
  }

  getChildStyle = (index, rect) => {
    if (!this.state.dragging || this.state.draggedElement !== index) return {}

    const x = this.state.position.x - rect.x - rect.width / 2
    const y = this.state.position.y - rect.y - rect.height / 2

    return {
      transform: `translate(${x}px, ${y}px)`
    }
  }

  render () {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          ...this.props.style,
        }}
        onMouseMove={this.onMouseMove}
      >
        {this.props.elements.map((element, index) => (
          <SizedElement>
            {rect => (
              <div
                onMouseDown={this.onMouseDown(index)}
                onMouseUp={this.onMouseUp(index)}
                style={{
                  transition: 'transform .1s',
                  ...this.getChildStyle(index, rect),
                }}
              >
                {this.props.renderElement(element, index)}
              </div>
            )}
          </SizedElement>
        ))}
      </div>
    )
  }
}

class SizedElement extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  render() {
    const rect = this.ref.current ? this.ref.current.getBoundingClientRect() : {}
    return (
      <div ref={this.ref}>{this.props.children(rect)}</div>
    )
  }
}
