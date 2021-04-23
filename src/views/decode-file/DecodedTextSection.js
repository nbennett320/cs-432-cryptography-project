import React from 'react'
import { Card } from 'react-bootstrap'

const DecodedTextSection = props => {
  return (
    <Card.Text style={styles.container}>
      {props.message.length > 0 && <code style={styles.code}>
        {props.message}
      </code>}
      {props.message.length === 0 && <code style={styles.code}>
        
      </code>}
    </Card.Text>
  )
}

const styles = {
  container: {
    padding: '8px',
    backgroundColor: '#f8f9fa'
  },
  code: {
    backgroundColor: '#f8f9fa'
  }
}

export default DecodedTextSection