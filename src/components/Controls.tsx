import { Direction } from '@/types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

type ControlsProps = {
  onDirectionChange: (direction: Direction) => void;
};

export default function Controls({ onDirectionChange }: ControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mt-4 touch-none select-none md:hidden">
      <div className="col-start-2">
        <button
          className="w-full p-4 bg-gray-700 rounded-lg active:bg-gray-600 transition-colors"
          onClick={() => onDirectionChange('UP')}
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
      </div>
      <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
        <button
          className="p-4 bg-gray-700 rounded-lg active:bg-gray-600 transition-colors"
          onClick={() => onDirectionChange('LEFT')}
        >
          <ArrowLeft className="w-6 h-6 mx-auto" />
        </button>
        <button
          className="p-4 bg-gray-700 rounded-lg active:bg-gray-600 transition-colors"
          onClick={() => onDirectionChange('DOWN')}
        >
          <ArrowDown className="w-6 h-6 mx-auto" />
        </button>
        <button
          className="p-4 bg-gray-700 rounded-lg active:bg-gray-600 transition-colors"
          onClick={() => onDirectionChange('RIGHT')}
        >
          <ArrowRight className="w-6 h-6 mx-auto" />
        </button>
      </div>
    </div>
  );
}
