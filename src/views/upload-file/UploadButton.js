import React from 'react'
import { Button } from 'react-bootstrap'

const UploadButton = props => {
  const fileInput = React.useRef()
  
  // handle upload button click
  const handleClick = () => {
    fileInput.current.click()
  }

  // handle when user uploads new file
  const handleChange = e => {
    const file = e.target.files[0]
    props.handleFileUpload(file)
  }

  return (
    <Button
      onClick={handleClick}
      variant="primary"
    >
      Upload
      <input 
        type="file" 
        ref={fileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </Button>
  )
}

export default UploadButton