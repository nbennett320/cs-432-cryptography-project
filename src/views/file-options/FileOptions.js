import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'
import '../../styles/transitions.css'

const ImageOptions = props => {
  const [isLoaded, setLoaded] = React.useState(false)
  const [fullImage, setFullImage] = React.useState(false)
  
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
            fullImage ? "image-preview image-preview--expanded" : "image-preview"
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
          <ButtonGroup>
            <Button
              onClick={() => {props.setView('encode-file')}}
              variant="outline-primary"
            >
              Encode a message
            </Button>
            <Button
              onClick={() => {props.setView('decode-file')}}
              variant="outline-primary"
            >
              Decode from media
            </Button>
            <Button
              onClick={() => setFullImage(!fullImage)}
              variant="outline-primary"
            >
              { fullImage ? 'Hide' : 'Show' } Full Image
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline-primary"
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

export default ImageOptions