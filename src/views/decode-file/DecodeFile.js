import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'
import { ImageDetails } from '../../components'
import SteganographyDecoder from '../../util/SteganographyDecoder'

const DecodeFile = props => {
  const [isLoaded, setLoaded] = React.useState(false)
  const [mode, setMode] = React.useState('default')
  React.useEffect(() => {
    props.image.parse().then(() => {
      setLoaded(true)
    }, [isLoaded])
  })

  const handleDecode = async (image) => {
    const decoder = new SteganographyDecoder(image)
    await decoder.decode().then(url => {
      setMode('has-decoded')
    })
  }

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
          <ImageDetails image={props.image}>
            {mode === 'has-decodecoded' && <span>
          </ImageDetails>
          <b style={styles.bold}>Message decoded!</b> Click the button below to copy the message to your clipboard.
          </span>}
          {mode === 'default' && <ButtonGroup>
            <Button
              onClick={() => handleDecode(props.image, message)}
              variant="outline-primary"
            >
              Decode
            </Button>
            <Button
              onClick={() => {}}
              variant="outline-secondary"
            >
              Back
            </Button>
          </ButtonGroup>}
          {mode === 'has-decoded' && <ButtonGroup>
            <Button
              onClick={() => handleDownload()}
              variant="outline-primary"
            >
              Download file
            </Button>
            <Button
              onClick={() => {}}
              variant="outline-secondary"
            >
              Back
            </Button>
          </ButtonGroup>}
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
  },
  bold: {
    fontWeight: '500'
  }
}

export default DecodeFile