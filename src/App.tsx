import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { Decor, GameOverBoard, MouseController, Passenger, StartBoard, Train } from './components';
import { DirectionType, IItemCoord } from './models/models';




function App() {
  const BOARD_LENGTH = 10;
  // Координаты декорций
  const TREES = [{x: 7, y: 6 }, /* {x: 2, y: 3 } */];
  const TREES2 = [{x: 8, y: 1 }, /* {x: 1, y: 8 } */];
  const BALLS = [{x: 3, y: 6 }, /* {x: 6, y: 3 } */];
  const [direction, setDirection] = useState<DirectionType>('right');
  const [train, setTrain] = useState<IItemCoord[]>([
    { x: 1, y: 0 },
    { x: 0, y: 0 }
  ])

  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(700);

  const isTrainCheck = (item: IItemCoord, index: number): boolean => {
    // Проверяем какой координате соответствет ячейка на доске (какая ячейка в какой координате)

    const x = index % BOARD_LENGTH;
    const y = Math.floor(index / BOARD_LENGTH);
    return (item.x == x && item.y == y);
  }

  const generatePassenger = () => {
    const x = Math.floor(Math.random() * BOARD_LENGTH);
    const y = Math.floor(Math.random() * BOARD_LENGTH);
    const newPassenger = { x, y };

    const allPoints = [...TREES, ...TREES2, ...BALLS];

    if (allPoints.some(point => point.x === newPassenger.x && point.y === newPassenger.y)) {
      return generatePassenger();
    }

    return newPassenger;
  }

  const [passenger, setPassenger] = useState<IItemCoord>(generatePassenger());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isGame, setIsGame] = useState<boolean>(false);

  const startGameHandler = () => {
    setLevel(1);
    setScore(0);
    setDirection("right");
    setGameOver(false);
    setSpeed(700);
    setTrain([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    setPassenger(generatePassenger());
    setIsGame(true);
  }


  const onKeyHandler = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
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
      default:
        break;
    }
  }, [direction])

  const trainMoveHandler = useCallback(() => {
    let newTrain = [...train];
    const trainHead = { ...newTrain[0] };

    switch (direction) {
      case "right":
        trainHead.x + 1 > 9 ? trainHead.x = 0 : trainHead.x += 1;
        break;
      case "left":
        trainHead.x - 1 < 0 ? trainHead.x = 9 : trainHead.x -= 1;
        break;
      case "up":
        trainHead.y - 1 < 0 ? trainHead.y = 9 : trainHead.y -= 1;
        break;
      case "down":
        trainHead.y + 1 > 9 ? trainHead.y = 0 : trainHead.y += 1;
        break;
      default:
        break;
    }

    newTrain.unshift(trainHead)
    if (newTrain.length > 1) {
      newTrain.pop()
    }
    setTrain(newTrain)
  }, [train, direction])

  useEffect(() => {
    const moveInterval = setInterval(trainMoveHandler, speed);

    return () => {
      clearInterval(moveInterval);
    }
  }, [trainMoveHandler, level, speed])

  useEffect(() => {
    document.addEventListener('keydown', onKeyHandler)

    return () => {
      document.removeEventListener('keydown', onKeyHandler)
    }
  }, [onKeyHandler])

  useEffect(() => {
    // train[0] - голова поезда
    // съедение пассажира
    if (train[0].x == passenger.x && train[0].y == passenger.y) {
      setPassenger(generatePassenger()); // генерируем новую позицию пассажира
      setScore((prev) => prev += 10);
      // 1 вариант увелечения уровня
      /* if (train.length % 97 === 0) {
        if (level < 13) {
          setLevel((prev) => prev += 1);
          setSpeed(() => 700 - level * 50);
          setDirection("right");
          setTrain([
            { x: 1, y: 0 },
            { x: 0, y: 0 },
          ]);
        } else {
          // добавляем "съеденного" пассажира в поезд
          const newTrain = [...train];
          const trainTail = { ...newTrain[newTrain.length - 1] }
          newTrain.push(trainTail)
          setTrain(newTrain)
        }
      } else {
        // добавляем "съеденного" пассажира в поезд
        const newTrain = [...train];
        const trainTail = { ...newTrain[newTrain.length - 1] }
        newTrain.push(trainTail)
        setTrain(newTrain)
      } */
      // 2 вариант увелечения уровня
      if(score % 20 == 0) {
          setLevel((prev) => prev += 1);
          if(level < 13) {
            setSpeed(() => 700 - level * 50);
          }
      }

      // добавляем "съеденного" пассажира в поезд
      const newTrain = [...train];
      const trainTail = { ...newTrain[newTrain.length - 1] }
      newTrain.push(trainTail)
      setTrain(newTrain)
    }

    // Проверяем не врезалась ли голова в тело, если да - конец игры
    for (let i = 1; i < train.length; i++) {
      const isTreeCrush = [...TREES, ...TREES2, ...BALLS].some(it => it.x == train[0].x && it.y == train[0].y);
      if ((train[i].x == train[0].x && train[i].y == train[0].y) || isTreeCrush) {
        setGameOver(true);
        if(score > totalScore) {
          localStorage.setItem("totalScore", JSON.stringify(score));
          setTotalScore(score);
        }
      }
    }
  }, [passenger, train, score, level, totalScore])

  useEffect(() => {
    const newTotalScore = localStorage.getItem("totalScore");
    if(!newTotalScore) {
      localStorage.setItem("totalScore", JSON.stringify(0));
    } else {
      setTotalScore(Number(newTotalScore));
    }
  }, [totalScore])

  return (
    <>
      <div className="game">
        <h1>Christmas Train</h1>
        <section className="gameStatic">
          <p>Level: {level}</p>
          <p>Score: {score}</p>
        </section>
        {!isGame ?
          <StartBoard startFn={startGameHandler} totalScore={totalScore} />
          :
          <div className="gameBoard">
            {!gameOver && TREES.map(tree => (<Decor decor={"tree"} x={tree.x} y={tree.y} />))}
            {!gameOver && TREES2.map(tree => (<Decor decor={"tree2"} x={tree.x} y={tree.y} />))}
            {!gameOver && BALLS.map(ball => (<Decor decor={"ball"} x={ball.x} y={ball.y} />))}
            {!gameOver ? (
              <Passenger x={passenger.x} y={passenger.y} /> 
            ) : (
              <GameOverBoard startFn={startGameHandler} totalScore={totalScore} />
            )}
            {
              Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, index) => (
                <div className='item' key={index}>
                  {!gameOver && 
                    train.some(item => isTrainCheck(item, index)) && <Train isHead={isTrainCheck(train[0], index)} trainDirection={direction} lvl={level} />
                  }
                </div>
              ))
            }
          </div>
        }
      </div>
      <MouseController 
        direction={direction} 
        speed={speed}
        lvl={level}
        setDirection={setDirection} 
        speedFn={setSpeed} 
      />
    </>
  )
}

export default App
