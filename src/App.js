import React from 'react'
import { NavigationBar } from './components'
import { 
  UploadFile,
  FileOptions
} from './views'
import './styles/App.css'

// poor man's view router
const useCurrentView = (view, props) => {
  switch(view) {
    case 'upload-file':
      return (
        <UploadFile {...props} />
      )
    case 'file-option':
      return (
        <FileOptions {...props} />
      )
    case 'encode-file':
      break
    case 'decode-file':
      break
    default:
      return (
        <UploadFile {...props} />
      )
  }
}

const App = () => {
  const [view, setView] = React.useState()
  const [file, setFile] = React.useState()
  const CurrentView = props => useCurrentView(view, props)
  return (
    <div className="app">
      <NavigationBar 
        navigateHome={() => setView('upload-file')}
      />
      <CurrentView 
        setView={setView}
      />
    </div>
  )
}

export default App
