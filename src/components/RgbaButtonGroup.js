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
          type='radio'
          variant='danger'
        >
          Red
        </ToggleButton>
        <ToggleButton
          checked={props.checked === 'green'}
          onChange={() => props.handleChecked('green')}
          type='radio'
          variant='success'
        >
          Green
        </ToggleButton>
        <ToggleButton
          checked={props.checked === 'blue'}
          onChange={() => props.handleChecked('blue')}
          type='radio'
          variant='primary'
        >
          Blue
        </ToggleButton>
        {props.showAlpha && <ToggleButton
          checked={props.checked === 'alpha'}
          onChange={() => props.handleChecked('alpha')}
          type='radio'
          variant='secondary'
        >
          Alpha
        </ToggleButton>}
      </ButtonGroup>
    </div>
  )
}

const styles = {
  container: {
    padding: '8px 0',
    paddingBottom: '12px'
  }
}

export default RgbaButtonGroup