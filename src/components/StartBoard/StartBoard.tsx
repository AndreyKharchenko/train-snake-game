import {FC} from 'react'
import './StartBoard.css'
import Train from '../../assets/train_img_bg.png'
import { IStartBoardProps } from '../../models/models'

export const StartBoard: FC<IStartBoardProps> = ({startFn, totalScore}) => {
    return (
        <div className="startBoard">
            <img src={Train} />
            <p>Press start to Play</p>
            <button onClick={startFn}>START</button>
            <p className="total">Total Score: {totalScore}</p>
        </div>
    )
}
