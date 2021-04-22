import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'
import { ImageDetails } from '../../components'
import SteganographyDecoder from '../../util/SteganographyDecoder'

const DecodeFile = props => {
  const [mode, setMode] = React.useState('default')
  const [message, setMessage] = React.useState()

  const handleDecode = async (image) => {
    const decoder = new SteganographyDecoder(image)
    await decoder.decode().then(msg => {
      console.log('recieved:',msg)
      setMessage(msg)
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
          <ImageDetails image={props.image}>
            {mode === 'has-decoded' && <span>
            <b style={styles.bold}>Message decoded!</b> Click the button below to copy the message to your clipboard.
            </span>}
          </ImageDetails>
          {mode === 'default' && <ButtonGroup>
            <Button
              onClick={() => handleDecode(props.image)}
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
              onClick={() => {/*handleDownload()*/}}
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