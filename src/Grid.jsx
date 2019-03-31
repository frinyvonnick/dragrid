import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DraggableElement = styled.div`
  user-select: ${props => props.dragging ? 'none': 'auto'}
`

export class Grid extends Component {
  state = {
    dragging: false,
    draggedElement: undefined,
    position: {},
  }

  onMouseMove = e => {
    if (!this.state.dragging) return
    const position = { x: e.clientX, y: e.clientY }
    this.setState(state => ({ position }))
  }

  onMouseDown = index => e => {
    this.setState({ dragging: true, draggedElement: index })
  }

  onMouseUp = index => e => {
    this.setState({ dragging: false, draggedElement: index, position: {} })
    const targetIndex = this.lastHoveredElementSide === 'left' ? this.lastHoveredElement: this.lastHoveredElement + 1
    this.props.onDrop(index, index < targetIndex ? targetIndex - 1 : targetIndex)
  }

  getChildStyle = (index, rectangle) => {
    this.updateHoveredElement(index, rectangle)
    if (!this.state.dragging || this.state.draggedElement !== index) return {}

    const x = this.state.position.x - rectangle.x - rectangle.width / 2
    const y = this.state.position.y - rectangle.y - rectangle.height / 2

    return {
      transform: `translate(${x}px, ${y}px)`,
      cursor: 'move',
      transition: 'transform .1s',
      opacity: '.7',
    }
  }

  updateHoveredElement(index, rectangle) {
    if (!isPointInRectangle(this.state.position, rectangle)) return
    this.lastHoveredElement = index

    const leftHalf = {
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width / 2,
      height: rectangle.height,
    }
    if (isPointInRectangle(this.state.position, leftHalf)) {
      this.lastHoveredElementSide = 'left'
      return
    }
    this.lastHoveredElementSide = 'right'
  }

  render () {
    return (
      <Wrapper
        style={this.props.style}
        onMouseMove={this.onMouseMove}
      >
        {this.props.elements.map((element, index) => (
          <SizedElement key={index}>
            {rect => (
              <DraggableElement
                dragging={this.state.dragging}
                onMouseDown={this.onMouseDown(index)}
                onMouseUp={this.onMouseUp(index)}
                style={this.getChildStyle(index, rect)}
              >
                {this.props.renderElement(element, index)}
              </DraggableElement>
            )}
          </SizedElement>
        ))}
      </Wrapper>
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

function isPointInRectangle(point, rectangle) {
  return rectangle.x <= point.x
    && point.x <= rectangle.x + rectangle.width
    && rectangle.y <= point.y
    && point.y <= rectangle.y + rectangle.height
}

