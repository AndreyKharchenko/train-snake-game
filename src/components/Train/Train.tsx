import React from 'react'
import './Train.css'
import { ITrainProps } from '../../models/models'

export const Train: React.FC<ITrainProps> = ({isHead, trainDirection, lvl}) => {

  const getRotate = () => {
    switch(trainDirection) {
      case "right":
        return "270deg";
      case "left":
        return "90deg"
      case "down":
        return "0deg"
      case "up":
        return "180deg"
      default: 
        return "270deg"
    }
  }

  const getColor = () => {
    if(isHead) {
      return undefined;
    }

    if(lvl % 2 == 0) {
      return 'red'
    } else {
      return ''
    }
  }
  
  return (
    <div className={(isHead) ? 'train-head' : `train ${getColor()}`} style={{transform: `rotate(${getRotate()})`}}></div>
  )
}