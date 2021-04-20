import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'
import TextArea from './TextArea'

const EncodeFile = props => {
  const [isLoaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    props.image.parse().then(() => {
      setLoaded(true)
    }, [isLoaded])
  })

  return (
    <div className="view">
      <Card style={styles.card}>
        <Card.Img 
          className={[
            "expand-transition", 
            "image-preview image-preview--expanded"
          ]}
          src={props.image.getUrl()}
          style={styles.cardImg}
          variant="top"
        />
        <Card.Body>
          <Card.Title>Filename: {props.image.getName()}</Card.Title>
          <Card.Text>
            Image resolution: {props.image.getHeight()} &times; 
            {props.image.getWidth()} pixels
            <br/>
            File type: {props.image.getFileType()}
            <br/>
            Size: {props.image.getFileSize()}
            <br/>
          </Card.Text>
          <TextArea />
          <ButtonGroup>
            <Button
              onClick={() => {props.setView('encode-file')}}
              variant="outline-primary"
            >
              Encode
            </Button>
            <Button
              onClick={() => {}}
              variant="outline-secondary"
            >
              Back
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

const styles = {
  card: {
    width: '36rem',
    marginTop: '9rem',
    alignSelf: 'center',
  },
  cardImg: {
    width: '100%',
    alignSelf: 'center',
    objectFit: 'cover',
    overflow: 'hidden',
  }
}

export default EncodeFile