'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

type ScoreContextType = {
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>
}

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreContext = createContext<ScoreContextType | null>(null);

export function useScoreContext() {
  const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

  return { score, setScore };
}

export function ScoreProvider({ children }: ScoreProviderProps) {
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  )
}