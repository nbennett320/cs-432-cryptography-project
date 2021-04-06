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
  const [height, setHeight] = React.useState()
  React.useEffect(() => {
    const mountCanvas = async () => {
      const img = await loadImage(props.file.url)
      const context = canvasRef.current.getContext('2d')
      setHeight((img.height / canvasRef.current.height) * canvasRef.current.height)
      canvasRef.current.height = height
      // const imgAspectRatio = img.width / img.height
      // const w = img.width / canvasRef.current.width
      // const h = w * (img.height / canvasRef.current.height) * (Math.abs(imgAspectRatio) < 1 ? img.height : canvasRef.current.height)
      context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    mountCanvas()
  })
  
  return (
    <div className="view">
      <Card style={styles.card}>
        <div style={{
          ...styles.cardImg,
          height: `${height}px`
        }}>
          <canvas 
            ref={r => {canvasRef.current = r}} 
            className={'image-preview--expanded'}
            style={{
              ...styles.cardImg,
              height: `${height}px`
            }}
          />
        </div>
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