![Logo of Dragrid](https://github.com/frinyvonnick/dragrid/blob/master/misc/logo.png)

# Dragrid

Simple grid with dragging feature for React

![Demonstration of dragrid](https://github.com/frinyvonnick/dragrid/blob/master/misc/demo.gif)

## Install 

using yarn:
```bash
yarn add dragrid
```

using npm:
```bash
npm install dragrid
```

## Usage 

```jsx
import React, { Component } from 'react'
import { Grid } from 'dragrid'

class Example extends Component {
  state = {
    data: [1, 2, 3, 4, 5, 6],
  }

  render() {
    return (
      <Grid
        elements={this.state.data}
        renderElement={(element => <div>{element}</div>)}
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
```

Dragrid uses storybook for development purpose you can also check out stories for a more concrete example.

```bash
npm install
npm run storybook
```
