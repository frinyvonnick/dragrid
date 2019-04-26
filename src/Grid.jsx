import React, { Component, createRef, useState, useRef } from 'react'
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
  const [dragging, setDragging] = useState(false)
  const [draggedElement, setDraggedElement] = useState(undefined)
  const [position, setPosition] = useState({})
  const [lastHoveredElement, setLastHoveredElement] = useState(undefined)
  const [lastHoveredElementSide, setLastHoveredElementSide] = useState(undefined)

  const onMouseMove = e => {
    if (!dragging) return
    const position = { x: e.clientX, y: e.clientY }
    setPosition(position)
  }

  const onMouseDown = index => e => {
    setDragging(true)
    setDraggedElement(index)
  }

  const onMouseUp = index => e => {
    setDragging(false)
    setDraggedElement(index)
    setPosition({})
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
    if (isPointInRectangle(position, leftHalf)) {
      setLastHoveredElementSide('left')
      return
    }
    setLastHoveredElementSide('right')
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

