import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/Home';
import Navigation from './components/Navigation';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navigation />
    <Home />
  </StrictMode>,
)
