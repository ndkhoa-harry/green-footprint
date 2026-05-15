import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { GameProvider } from './context/GameContext'
import InputPage from './pages/InputPage'
import InstructionPage from './pages/InstructionPage'
import MapPage from './pages/MapPage'
import Phase1Game from './pages/Phase1Game'
import Phase2Game from './pages/Phase2Game'
import Phase3Game from './pages/Phase3Game'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<InputPage />} />
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/phase/1" element={<Phase1Game />} />
            <Route path="/phase/2" element={<Phase2Game />} />
            <Route path="/phase/3" element={<Phase3Game />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </GameProvider>
    </UserProvider>
  )
}

export default App
