import { HashRouter as Router, Route, Navigate } from 'react-router-dom'
import PageShell from './components/PageShell'
import { UserProvider } from './context/UserContext'
import { GameProvider } from './context/GameContext'
import InputPage from './pages/InputPage'
import InstructionPage from './pages/InstructionPage'
import MapPage from './pages/MapPage'
import Phase1Game from './pages/Phase1Game'
import Phase2Game from './pages/Phase2Game'
import Phase3Game from './pages/Phase3Game'
import ResultPage from './pages/ResultPage'
import HomePage from './pages/HomePage'
import './App.css'

const routes = [
  { path: '/', element: <InputPage /> },
  { path: '/instructions', element: <InstructionPage /> },
  { path: '/map', element: <MapPage /> },
  { path: '/phase/1', element: <Phase1Game /> },
  { path: '/phase/2', element: <Phase2Game /> },
  { path: '/phase/3', element: <Phase3Game /> },
  { path: '/results', element: <ResultPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <Router>
          <PageShell routes={routes} />
        </Router>
      </GameProvider>
    </UserProvider>
  )
}

export default App
