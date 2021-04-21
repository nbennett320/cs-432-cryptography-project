import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const TextArea = props => {
  const handleChange = e => props.setMessage(e.target.value)

  return (
    <div style={styles.container}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Message:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          onChange={handleChange}
          as="textarea" 
          aria-label="With textarea" 
        />
      </InputGroup>
    </div>
  )
}

const styles = {
  container: {
    margin: '12px 0'
  }
}

export default TextArea