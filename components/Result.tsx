interface ResultProps {
  wpm: number;
  accuracy: number;
  restartTest: () => void;
}

export default function Result({ wpm, accuracy, restartTest }: ResultProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 mt-10 px-4 text-gray-200">
      {/* Stats Container */}
      <div className="bg-[#303030] p-10 rounded-3xl shadow-xl w-full max-w-3xl flex flex-col sm:flex-row justify-around items-center gap-8 border border-gray-600">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-400">Accuracy</h2>
          <p className="text-4xl sm:text-5xl font-bold text-red-400">
            {accuracy}%
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-400">Words Per Minute</h2>
          <p className="text-4xl sm:text-5xl font-bold text-purple-400">
            {isNaN(wpm) ? 0 : wpm}
          </p>
        </div>
      </div>

      {/* Restart Button */}
      <button
        onClick={restartTest}
        className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-gray-200 px-7 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out shadow-lg hover:scale-105"
      >
        🔁 Restart Test
      </button>
    </div>
  );
}
