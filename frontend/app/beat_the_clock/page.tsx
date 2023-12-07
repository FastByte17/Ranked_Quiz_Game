'use client'
import React from 'react'
import TopCompany from '../top_company/page'

export default function BeatTheClock() {
  return (
    <div>
      <TopCompany timerDuration={10} />
      {/* Pass props for timer */}
    </div>
  )
}