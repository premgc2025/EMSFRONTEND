import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TheContext from './context/TheContext.jsx'

createRoot(document.getElementById('root')).render(
 <TheContext>
    <App />
    </TheContext>
  
)
