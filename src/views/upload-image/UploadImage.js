import React from 'react'
import {
  Card,
  Button
} from 'react-bootstrap'

const UploadImage = props => {
  return (
    <div className="view">
      <Card style={styles}>
        <Card.Body>
          <Card.Title>Select file</Card.Title>
          <Card.Text>
            Upload a photo or audio file you wish to encode with a message
            or extract a message from.
          </Card.Text>
          <Button 
            variant="primary"
          >
            Upload
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

const styles = {
  width: '18rem',
  marginTop: '9rem',
  alignSelf: 'center'
}

export default UploadImage