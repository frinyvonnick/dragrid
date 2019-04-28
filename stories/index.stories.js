import React, { Component } from 'react';
import styled from 'styled-components'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Grid } from '../src'
import './stories.css'

const StyledItem = styled.div`
  background-color: #ddd;
  width: 150px;
  height: 150px;
  margin: 2px;
  color: white;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Default extends Component {
  state = {
    data: [1, 2, 3, 4, 5, 6],
  }

  render() {
    return (
      <Grid
        style={{ maxWidth: '500px' }}
        elements={this.state.data}
        renderElement={(element => <StyledItem>{element}</StyledItem>)}
        onDrop={(newList) => {
          this.setState({ data: newList })
        }}
      />
    )
  }
}

class WithClassName extends Component {
  state = {
    data: [1, 2, 3, 4, 5, 6],
  }

  render() {
    return (
      <Grid
        style={{ maxWidth: '500px' }}
        elements={this.state.data}
        renderElement={(element => <StyledItem>{element}</StyledItem>)}
        elementClassName="some-class-name"
        onDrop={(newList) => {
          this.setState({ data: newList })
        }}
      />
    )
  }
}

storiesOf('Grid', module)
  .add('default', () => (
    <Default />
  ))
  .add('with className', () => (
    <WithClassName />
  ))
