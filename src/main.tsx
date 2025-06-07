import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './app/home/page'  // Asegúrate de que la ruta sea correcta
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
)