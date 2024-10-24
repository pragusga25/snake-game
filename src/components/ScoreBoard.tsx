import { Trophy } from 'lucide-react';

type ScoreBoardProps = {
  score: number;
  highScore: number;
};

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <span className="text-xl">Score: {score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-purple-400" />
        <span className="text-xl">High Score: {highScore}</span>
      </div>
    </div>
  );
}
