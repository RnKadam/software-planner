import { BrainCog, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BrainCog className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">
              AI Software Planner
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-300">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
