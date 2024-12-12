import React from 'react'
import "./Decor.css"
import { IDecorProps } from '../../models/models'


export const Decor: React.FC<IDecorProps> = ({x, y, decor}) => {
  return (
    <div 
        className={`decor ${decor}`} 
        style={{top: `${y * 32}px`, left: `${x * 32}px`}} 
    />
  )
}