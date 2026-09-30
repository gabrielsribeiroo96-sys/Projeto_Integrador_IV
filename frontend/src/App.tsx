import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Simulacao from './pages/Simulacao'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Simulação de Crédito</h1>

          <p>
            Análise de risco para concessão de crédito
          </p>
        </header>

        <nav className="navigation">
          <NavLink
            to="/simulacao"
            className={({ isActive }) =>
              isActive ? 'navigation-link active' : 'navigation-link'
            }
          >
            Simulação
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'navigation-link active' : 'navigation-link'
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <Routes>
          <Route path="/simulacao" element={<Simulacao />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="*"
            element={<Navigate to="/simulacao" replace />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App