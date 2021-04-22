import React from 'react'
import { Card } from 'react-bootstrap'

const DecodedTextSection = props => {
  return (
    <Card.Text style={styles.container}>
      <code style={styles.code}>
        {props.message}
      </code>
    </Card.Text>
  )
}

const styles = {
  container: {
    padding: '8px',
    backgroundColor: '#f8f9fa'
  },
  code: {
    backgroundColor: '#f8f9fa !important'
  }
}

export default DecodedTextSection