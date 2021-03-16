import React from 'react'
import { Card } from 'react-bootstrap'

const ImageOptions = props => {
  return (
    <div className="view">
      <Card style={styles.card}>
        <Card.Body>
          <Card.Title>Select file</Card.Title>
          <Card.Text>
            Image options
          </Card.Text>
          <UploadButton />
        </Card.Body>
      </Card>
    </div>
  )
}

const styles = {
  card: {
    width: '18rem',
    marginTop: '9rem',
    alignSelf: 'center'
  }
}

export default ImageOptions