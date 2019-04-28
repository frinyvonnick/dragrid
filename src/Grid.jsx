import React, { Component, createRef, useState, useReducer, useRef } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DraggableElement = styled.div`
  user-select: ${props => props.dragging ? 'none': 'auto'}
`

export function Grid(props) {
  const [
    {
      dragging,
      draggedElement,
      position,
    },
    dispatch,
  ] = useReducer(reducer, {
    dragging: false,
    position: {},
  })

  // Had to handle this logic separately otherwise a maximum call state error is triggered
  const [lastHoveredElement, setLastHoveredElement] = useState()
  const [lastHoveredElementSide, setLastHoveredElementSide] = useState()

  const onMouseMove = e => {
    if (!dragging) return
    dispatch({ type: 'ON_MOUSE_MOVE', x: e.clientX, y: e.clientY })
  }

  const onMouseDown = index => e => dispatch({ type: 'ON_MOUSE_DOWN', index })

  const onMouseUp = index => e => {
    dispatch({ type: 'ON_MOUSE_UP', index })
    const targetIndex = lastHoveredElementSide === 'left' ? lastHoveredElement: lastHoveredElement + 1
    props.onDrop(index, index < targetIndex ? targetIndex - 1 : targetIndex)
  }

  const updateHoveredElement = (index, rectangle) => {
    if (!isPointInRectangle(position, rectangle)) return
    setLastHoveredElement(index)

    const leftHalf = {
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width / 2,
      height: rectangle.height,
    }

    setLastHoveredElementSide(isPointInRectangle(position, leftHalf) ? 'left' : 'right')
  }

  const getChildStyle = (index, rectangle) => {
    updateHoveredElement(index, rectangle)
    if (!dragging || draggedElement !== index) return {}

    const x = position.x - rectangle.x - rectangle.width / 2
    const y = position.y - rectangle.y - rectangle.height / 2

    return {
      transform: `translate(${x}px, ${y}px)`,
      cursor: 'move',
      transition: 'transform .1s',
      opacity: '.7',
    }
  }

  return (
    <Wrapper
      style={props.style}
      onMouseMove={onMouseMove}
    >
      {props.elements.map((element, index) => (
        <SizedElement
          key={index}
          className={props.elementClassName}
        >
          {rect => (
            <DraggableElement
              dragging={dragging}
              onMouseDown={onMouseDown(index)}
              onMouseUp={onMouseUp(index)}
              style={getChildStyle(index, rect)}
            >
              {props.renderElement(element, index)}
            </DraggableElement>
          )}
        </SizedElement>
      ))}
    </Wrapper>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'ON_MOUSE_MOVE':
      return {
        ...state,
        position: { x: action.x, y: action.y }
      }
    case 'ON_MOUSE_DOWN':
      return {
        ...state,
        dragging: true,
        draggedElement: action.index,
      }
    case 'ON_MOUSE_UP':
      return {
        ...state,
        dragging: false,
        draggedElement: action.index,
        position: {},
      }
    default:
      throw Error(`The action "${action.type}" is not supported.`);
    }
}

function SizedElement(props) {
  const ref = useRef(null)

  const rect = ref.current ? ref.current.getBoundingClientRect() : {}
  return (
    <div className={props.className} ref={ref}>{props.children(rect)}</div>
  )
}

function isPointInRectangle(point, rectangle) {
  return rectangle.x <= point.x
    && point.x <= rectangle.x + rectangle.width
    && rectangle.y <= point.y
    && point.y <= rectangle.y + rectangle.height
}

