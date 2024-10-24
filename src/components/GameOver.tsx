import React from 'react';
import { RotateCcw } from 'lucide-react';

type GameOverProps = {
  score: number;
  onRestart: () => void;
};

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-6">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2 transition-colors mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
}
