import React from 'react'
import { NavigationBar } from './components'
import { 
  UploadFile,
  FileOptions,
  EncodeFile
} from './views'
import './styles/App.css'

const App = () => {
  // poor man's view router
  const [view, setView] = React.useState()
  const [file, setFile] = React.useState()

  React.useEffect(() => {
    console.log('view changed: ', view)
  }, [view])

  return (
    <div className="app">
      <NavigationBar 
        navigateHome={() => setView('upload-file')}
      />
      {view === 'upload-file' && <UploadFile setFile={setFile} />}
      {view === 'file-options' && <FileOptions 
        file={file} 
        setView={setView} 
      />}
      {view === 'encode-file' && <EncodeFile 
        file={file} 
        setView={setView} 
      />}
      {/* {view === 'decode-file' && <UploadFile {...props} />} */}
      {!view && <UploadFile 
        setView={setView} 
        setFile={setFile}
      />}
    </div>
  )
}

export default App
