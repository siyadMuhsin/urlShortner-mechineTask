import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth.context.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
<StrictMode>
    <App />
  </StrictMode>,
    </AuthProvider>
  
  </Router>

)
