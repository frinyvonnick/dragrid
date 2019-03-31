import React, { Component } from 'react';
import styled from 'styled-components'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Grid } from '../src'

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
        onDrop={(elementIndex, targetIndex) => {
          const copy = [...this.state.data]
          const element = copy.splice(elementIndex, 1)
          copy.splice(targetIndex, 0, element)
          this.setState({ data: copy })
        }}
      />
    )
  }
}

storiesOf('Grid', module)
  .add('default', () => (
    <Default />
  ))
