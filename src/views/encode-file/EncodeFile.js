import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'
import { ImageDetails } from '../../components'
import TextArea from './TextArea'
import SteganographyEncoder from '../../util/SteganographyEncoder'

const EncodeFile = props => {
  const [message, setMessage] = React.useState("")
  const [src, setSrc] = React.useState(props.image.getUrl())
  const [mode, setMode] = React.useState('default')
  
  const handleEncode = async (image, message) => {
    const encoder = new SteganographyEncoder(image, message)
    await encoder.encode().then(url => {
      setSrc(url)
      console.log("renewed url:", url)
      console.log("renewed src:", src)
      setMode('has-encoded')
    })
  }

  const handleDownload = () => {
    const anchor = document.createElement('a')
    anchor.download = `encoded_${props.image.getName()}`
    anchor.href = src
    anchor.click()
  }
  
  return (
    <div className="view">
      <Card style={styles.card}>
        <Card.Img 
          className={[
            "expand-transition", 
            "image-preview image-preview--expanded"
          ]}
          src={src}
          style={styles.cardImg}
          variant="top"
        />
        <Card.Body>
          <ImageDetails image={props.image}>
            {mode === 'has-encoded' && <span>
              <b style={styles.bold}>Message encoded!</b> Click the button below to download your steganographic photo.
            </span>}
          </ImageDetails>
          <TextArea setMessage={setMessage} />
          {mode === 'default' && <ButtonGroup>
            <Button
              onClick={() => handleEncode(props.image, message)}
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
          </ButtonGroup>}
          {mode === 'has-encoded' && <ButtonGroup>
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

export default EncodeFile