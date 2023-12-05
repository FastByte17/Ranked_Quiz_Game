'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

type ScoreContextType = {
  score: number,
  highScore: number,
  setScore: React.Dispatch<React.SetStateAction<number>>
  setHighScore: React.Dispatch<React.SetStateAction<number>>
}

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreContext = createContext<ScoreContextType | null>(null);

export function useScoreContext() {
  const { score, setScore, highScore, setHighScore } = useContext(ScoreContext) as ScoreContextType;

  return { score, setScore, highScore, setHighScore};
}

export function ScoreProvider({ children }: ScoreProviderProps) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  useEffect(()=> {
    const initialHighScore = typeof window !== 'undefined' ? Number(localStorage.getItem('highScore')) : 0;
    setHighScore(initialHighScore)
  }, [])
  return (
    <ScoreContext.Provider value={{ score, setScore, highScore, setHighScore }}>
      {children}
    </ScoreContext.Provider>
  )
}