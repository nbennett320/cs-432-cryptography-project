import React from 'react'
import { NavigationBar } from './components'
import { UploadImage } from './views'
import './styles/App.css'

// poor man's view router
const useCurrentView = (view, props) => {
  switch(view) {
    case 'upload-image':
      return (
        <UploadImage {...props} />
      )
    case 'encode-image':
      break
    case 'decode-image':
      break
    default:
      return (
        <UploadImage {...props} />
      )
  }
}

const App = () => {
  const [view, setView] = React.useState()
  const CurrentView = props => useCurrentView(view, props)
  return (
    <div className="app">
      <NavigationBar 
        navigateHome={() => setView('upload-image')}
      />
      <CurrentView 
        demoProp="yooo"
      />
    </div>
  )
}

export default App
