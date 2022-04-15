import './App.css';
import React, {useEffect, useState} from 'react'
import * as GoogleApi from './Components/GoogleApi'

function App() {
  const [pdfItems, setPdfItems] = useState(['hi'])
  const [credentialsLoaded, setCredentialsLoaded] = useState(false)

  useEffect(() => GoogleApi.getGoogleCredentials(setCredentialsLoaded), [])
  useEffect(() => GoogleApi.InitializeGoogleDrive(), [credentialsLoaded])

  const handleLogin = () => {
    GoogleApi.authenticate()
  }

  const handleGetFiles = () => {
    GoogleApi.execute()
  }

  const handleGetFileContent = () => {
    GoogleApi.getFileContent(pdfItems,setPdfItems)
  }

  return (
    <div className="App">
      <button onClick={handleLogin}>Sign in</button>
      <button onClick={handleGetFiles}> Get Files</button>
      <button onClick={handleGetFileContent}> Download File</button>
      <div>{pdfItems}</div>
    </div>
  );
}

export default App;
