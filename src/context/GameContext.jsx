import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext(null)

const STORAGE_KEY = 'greenFootprint_game'

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { currentPhase: 1, completedPhases: [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  const completePhase = (phase) => {
    setGameState((prev) => ({
      ...prev,
      completedPhases: prev.completedPhases.includes(phase)
        ? prev.completedPhases
        : [...prev.completedPhases, phase],
      currentPhase: Math.min(phase + 1, 3),
    }))
  }

  const isPhaseCompleted = (phase) => gameState.completedPhases.includes(phase)

  const resetGame = () => {
    setGameState({ currentPhase: 1, completedPhases: [] })
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <GameContext.Provider value={{ gameState, completePhase, isPhaseCompleted, resetGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
