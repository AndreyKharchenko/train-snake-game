import React from 'react'
import "./Passenger.css"

export const Passenger: React.FC<{x: number, y: number}> = ({x, y}) => {
  return (
    <div 
        className="passenger" 
        style={{top: `${y * 32}px`, left: `${x * 32}px`}} 
    />
  )
}