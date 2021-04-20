import React from 'react'
import { NavigationBar } from './components'
import { 
  UploadFile,
  FileOptions,
  EncodeFile
} from './views'
import ImageParser from './util/ImageParser'
import './styles/App.css'

const imageParser = new ImageParser()

const App = () => {
  // poor man's view router
  const [view, setView] = React.useState()

  React.useEffect(() => {
    console.log('view changed: ', view)
  }, [view])

  return (
    <div className="app">
      <NavigationBar 
        navigateHome={() => setView('upload-file')}
      />
      {view === 'upload-file' && <UploadFile 
        setView={setView} 
        image={imageParser}
      />}
      {view === 'file-options' && <FileOptions 
        setView={setView} 
        image={imageParser}
      />}
      {view === 'encode-file' && <EncodeFile 
        setView={setView} 
        image={imageParser}
      />}
      {/* {view === 'decode-file' && <UploadFile {...props} />} */}
      {!view && <UploadFile 
        setView={setView} 
        image={imageParser}
      />}
    </div>
  )
}

export default App
