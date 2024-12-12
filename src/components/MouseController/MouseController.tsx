import { FC } from "react"
import './MouseController.css'
import { IMouseControllerProps } from "../../models/models"
import { Icon } from "../Icon"

export const MouseController: FC<IMouseControllerProps> = ({ setDirection, speedFn, direction, speed, lvl }) => {
    const setDirectionHandler = (data: string) => {
        switch (data) {
            case "ArrowRight":
                if (direction != "left") {
                    setDirection("right");
                }
                break;
            case "ArrowLeft":
                if (direction != "right") {
                    setDirection("left");
                }
                break;
            case "ArrowUp":
                if (direction != "down") {
                    setDirection("up");
                }
                break;
            case "ArrowDown":
                if (direction != "up") {
                    setDirection("down");
                }
                break;
            case "Pause":
                speedFn(99999999999);
                break;
            case "Play":
                speedFn(lvl === 1 ? 700 : 750 - lvl * 50);
                break;
            default:
                break;
        }
    }
    return (
        <div className="controller">
            <div>
                <button className={`btn up ${direction == 'down' && 'disabled'}`} onClick={() => setDirectionHandler("ArrowUp")}><Icon name='chevron' /></button>
            </div>
            <div>
                <button className={`btn left ${direction == 'right' && 'disabled'}`} onClick={() => setDirectionHandler("ArrowLeft")}><Icon name='chevron' /></button>
                <button className={`btn`} onClick={() => setDirectionHandler(speed > 999 ? "Play" : "Pause")}>
                    {speed > 999 ? <Icon name="play" />  : <Icon name="pause" />} 
                </button>
                <button className={`btn right ${direction == 'left' && 'disabled'}`} onClick={() => setDirectionHandler("ArrowRight")}><Icon name='chevron' /></button>
            </div>
            <div>
                <button className={`btn ${direction == 'up' && 'disabled'}`} onClick={() => setDirectionHandler("ArrowDown")}><Icon name='chevron' /></button>
            </div>
        </div>
    )
}