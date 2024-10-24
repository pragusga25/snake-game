import { Position } from '../types';
import { useEffect, useRef, useState } from 'react';

type GameBoardProps = {
  snake: Position[];
  food: Position;
  gridSize: number;
};

export default function GameBoard({ snake, food, gridSize }: GameBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);

  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const containerSize = Math.min(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
        setCellSize(containerSize / gridSize);
      }
    };

    // Initial size calculation
    updateCellSize();

    // Update on window resize
    const resizeObserver = new ResizeObserver(updateCellSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [gridSize]);

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-800 rounded-lg overflow-hidden"
      style={{
        width: '90vmin',
        height: '90vmin',
        maxWidth: '600px',
        maxHeight: '600px',
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500 rounded-sm"
          style={{
            width: Math.max(cellSize - 2, 0),
            height: Math.max(cellSize - 2, 0),
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            transition: 'all 0.1s linear',
          }}
        />
      ))}
      <div
        className="absolute bg-red-500 rounded-full"
        style={{
          width: Math.max(cellSize - 2, 0),
          height: Math.max(cellSize - 2, 0),
          left: food.x * cellSize,
          top: food.y * cellSize,
        }}
      />
    </div>
  );
}
