export interface IItemCoord {
    x: number
    y: number
}

export interface ITrainProps {
    isHead: boolean
    trainDirection: DirectionType
    lvl: number
}

export type DirectionType = "right" | "left" | "up" | "down";

export interface IMouseControllerProps {
    setDirection: (data: DirectionType) => void;
    direction: DirectionType
    speedFn: (data: number) => void
    speed: number
    lvl: number
}

export type DecorType = "tree" | "tree2" | "ball";

export interface IDecorProps {
    x: number, 
    y: number, 
    decor: DecorType
}

export interface IGameOverBoardProps {
    startFn: () => void,
    totalScore: number
}

export interface IStartBoardProps extends IGameOverBoardProps {}

export interface IIconProps {
    name: IconType
}

type IconType = "chevron" | "play" | "pause"