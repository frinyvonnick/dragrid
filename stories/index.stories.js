import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Grid } from '../components'

const StyledItem = ({ children }) => (
  <div 
    style={{
      backgroundColor: '#ddd',
      width: '150px',
      height: '150px',
      margin: '2px',
      color: 'white',
      fontSize: '34px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
) 

storiesOf('Grid', module)
  .add('default', () => {
    const data = [1, 2, 3, 4, 5, 6]
    return (
      <Grid 
        style={{ maxWidth: '500px' }}
        elements={data}
        renderElement={(element => <StyledItem>{element}</StyledItem>)}
      />
    )
  })
