import React from 'react'
import { 
  ToggleButton,
  ButtonGroup
} from 'react-bootstrap'

const RgbaButtonGroup = props => {
  return (
    <div style={styles.container}>
      <ButtonGroup toggle>
        <ToggleButton
          checked={props.checked === 'red'}
          onChange={() => props.handleChecked('red')}
          color='red'
          type='radio'
        >
          Red
        </ToggleButton>
        <ToggleButton
          checked={props.checked === 'green'}
          onChange={() => props.handleChecked('green')}
          type='radio'
        >
          Green
        </ToggleButton>
        <ToggleButton
          checked={props.checked === 'blue'}
          onChange={() => props.handleChecked('blue')}
          type='radio'
        >
          Blue
        </ToggleButton>
        {props.showAlpha && <ToggleButton
          checked={props.checked === 'alpha'}
          onChange={() => props.handleChecked('alpha')}
          type='radio'
        >
          Alpha
        </ToggleButton>}
      </ButtonGroup>
    </div>
  )
}

const styles = {
  container: {
    padding: '4px'
  }
}

export default RgbaButtonGroup