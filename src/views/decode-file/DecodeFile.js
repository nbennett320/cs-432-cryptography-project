import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup,
  Alert
} from 'react-bootstrap'
import { 
  ImageDetails,
  RgbaButtonGroup 
} from '../../components'
import DecodedTextSection from './DecodedTextSection'
import SteganographyDecoder from '../../util/SteganographyDecoder'

const DecodeFile = props => {
  const [mode, setMode] = React.useState('default')
  const [message, setMessage] = React.useState()
  const [showAlert, setShowAlert] = React.useState(false)
  const [checked, setChecked] = React.useState('red')

  const handleDecode = async (image) => {
    const decoder = new SteganographyDecoder(image, checked)
    await decoder.decode().then(msg => {
      console.log('recieved:',msg)
      setMessage(msg)
      setMode('has-decoded')
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
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
            {(mode === 'has-decoded') && (message.length > 0) && <span>
              <b style={styles.bold}>Message decoded!</b> Click the button below to copy the message to your clipboard.
            </span>}
            {(mode === 'has-decoded') && (message.length === 0) && <span>
              <b style={styles.bold}>No parsable ascii-encoded messages were found...</b> <br />Maybe try another decoding with a different RGBA channel?
            </span>}
          </ImageDetails>
          {mode === 'has-decoded' && <DecodedTextSection message={message} />}
          <Alert 
            show={showAlert}
            variant="primary"
            onClick={() => setShowAlert(false)}
            style={styles.alert}
          >
            Copied to clipboard!
          </Alert>
          {mode === 'default' && <RgbaButtonGroup 
            checked={checked}
            handleChecked={setChecked}
            showAlpha={props.image.getFileType() === 'png'}
          />}
          {mode === 'default' && <ButtonGroup>
            <Button
              onClick={() => handleDecode(props.image)}
              variant="outline-primary"
            >
              Decode
            </Button>
            <Button
              onClick={() => {props.setView('file-options')}}
              variant="outline-secondary"
            >
              Back
            </Button>
          </ButtonGroup>}
          {mode === 'has-decoded' && <ButtonGroup>
            <Button
              onClick={() => {handleCopy()}}
              variant="outline-primary"
              disabled={message.length === 0}
            >
              Copy to clipboard
            </Button>
            <Button
              onClick={() => {setMode('default')}}
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
  },
  alert: {
    cursor: 'pointer'
  }
}

export default DecodeFile