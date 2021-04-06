import React from 'react'
import { 
  Card, 
  Button,
  ButtonGroup
} from 'react-bootstrap'

const loadImage = url => {
  return new Promise(res =>{
    const img = new Image()
    img.src = url
    img.onload = () => res(img)
  })
}

const EncodeFile = props => {
  const canvasRef = React.useRef()
  React.useEffect(async () => {
    const img = await loadImage(props.file.url)
    const context = canvasRef.current.getContext('2d')
    context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
  })
  
  return (
    <div className="view">
      <Card style={styles.card}>
        <Card.Img 
          className={[
            "expand-transition", 
            // fullImage ? "image-preview image-preview--expanded" : "image-preview"
          ]}
          src={props.file.url}
          style={styles.cardImg}
          variant="top"
        />
        <Card.Body>
          <Card.Title>Filename: {props.file.data.name}</Card.Title>
          <Card.Text>
            Image options
          </Card.Text>
          <ButtonGroup>
            <Button
              onClick={() => {}}
              variant="outline-primary"
            >
              Encode a message
            </Button>
            <Button
              onClick={() => {}}
              variant="outline-primary"
            >
              Decode from media
            </Button>
            {/* <Button
              onClick={() => setFullImage(!fullImage)}
              variant="outline-primary"
            >
              { fullImage ? 'Hide' : 'Show' } Full Image
            </Button> */}
            {/* <Button
              onClick={() => {}}
              variant="outline-primary"
            >
              Restart
            </Button> */}
          </ButtonGroup>
        </Card.Body>
      </Card>
      <canvas ref={r => {canvasRef.current = r}} />
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