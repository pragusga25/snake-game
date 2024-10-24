import { Keyboard } from 'lucide-react';

export default function Instructions() {
  return (
    <div className="text-gray-400 text-center mt-4 hidden md:block">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Keyboard className="w-5 h-5" />
        <span>Controls:</span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">↑</kbd>
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">W</kbd>
          <span>Up</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">↓</kbd>
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">S</kbd>
          <span>Down</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">←</kbd>
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">A</kbd>
          <span>Left</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">→</kbd>
          <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">D</kbd>
          <span>Right</span>
        </div>
      </div>
      <div className="mt-2">
        <kbd className="px-2 py-1 bg-gray-700 rounded-md text-sm">Space</kbd>
        <span className="ml-2">Pause/Resume</span>
      </div>
    </div>
  );
}
