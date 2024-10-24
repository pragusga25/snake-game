import { Position } from '../types';

type GameBoardProps = {
  snake: Position[];
  food: Position;
  gridSize: number;
  cellSize: number;
};

export default function GameBoard({
  snake,
  food,
  gridSize,
  cellSize,
}: GameBoardProps) {
  return (
    <div
      className="relative bg-gray-800 rounded-lg overflow-hidden"
      style={{
        width: gridSize * cellSize,
        height: gridSize * cellSize,
        maxWidth: '90vmin',
        maxHeight: '90vmin',
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500 rounded-sm"
          style={{
            width: cellSize - 2,
            height: cellSize - 2,
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            transition: 'all 0.1s linear',
          }}
        />
      ))}
      <div
        className="absolute bg-red-500 rounded-full"
        style={{
          width: cellSize - 2,
          height: cellSize - 2,
          left: food.x * cellSize,
          top: food.y * cellSize,
        }}
      />
    </div>
  );
}
