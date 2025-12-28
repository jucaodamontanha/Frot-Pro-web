import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { Login } from './pages/Login.jsx'
import { Manutencoes } from './pages/Manutencoes.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Usuarios } from './pages/Usuarios.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/veiculos" element={<App />} />
        <Route path="/manutencoes" element={<Manutencoes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)