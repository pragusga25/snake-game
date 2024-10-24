import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Position, Direction } from '../types';
import GameBoard from './GameBoard';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import Instructions from './Instructions';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;

export default function Game() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(true);
  }, [generateFood]);

  const checkCollision = (head: Position): boolean => {
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    for (const segment of snake.slice(1)) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }

    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    const head = { ...snake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const newSnake = [head];
    const ateFood = head.x === food.x && head.y === food.y;

    if (ateFood) {
      setScore((prev) => prev + 10);
      setFood(generateFood());
      setSpeed((prev) => Math.max(prev - SPEED_INCREASE, 50));
      newSnake.push(...snake);
    } else {
      newSnake.push(...snake.slice(0, -1));
    }

    setSnake(newSnake);
  }, [
    snake,
    direction,
    food,
    gameOver,
    isPaused,
    score,
    highScore,
    generateFood,
  ]);

  const handleDirectionChange = (newDirection: Direction) => {
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[newDirection] !== direction) {
      setDirection(newDirection);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const key = e.key.toLowerCase();

      if (key === ' ') {
        setIsPaused((prev) => !prev);
        return;
      }

      const directionMap: { [key: string]: Direction } = {
        arrowup: 'UP',
        arrowdown: 'DOWN',
        arrowleft: 'LEFT',
        arrowright: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      };

      const newDirection = directionMap[key];
      if (newDirection) {
        handleDirectionChange(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <ScoreBoard score={score} highScore={highScore} />

        <GameBoard
          snake={snake}
          food={food}
          gridSize={GRID_SIZE}
          cellSize={CELL_SIZE}
        />

        <div className="flex gap-4">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center gap-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            {isPaused ? 'Start' : 'Pause'}
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <Controls onDirectionChange={handleDirectionChange} />
        <Instructions />

        {gameOver && <GameOver score={score} onRestart={resetGame} />}
      </div>
    </div>
  );
}
