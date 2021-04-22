import React from 'react'
import { Card } from 'react-bootstrap'

const ImageDetails = props => {
  return(
    <>
      <Card.Text>
        Image resolution: {props.image.getHeight()} &times; 
        {props.image.getWidth()} pixels
        <br/>
        File type: {props.image.getFileType()}
        <br/>
        Size: {props.image.getFileSize()}
        <br/>
        {props.children}
      </Card.Text>
    </>
  )
}

export default ImageDetails