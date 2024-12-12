import { FC } from 'react'
import './GameOverBoard.css'
import { IGameOverBoardProps } from '../../models/models'

export const GameOverBoard: FC<IGameOverBoardProps> = ({ startFn, totalScore }) => {
    return (
        <div className="gameOverBoard">
            <h2>Game Over!</h2>
            <p>Press start to Play</p>
            <button onClick={startFn}>START</button>
            <p className="total">Total Score: {totalScore}</p>
        </div>
    )
}