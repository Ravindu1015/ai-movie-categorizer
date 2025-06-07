'use client';
import { useState } from 'react';

export default function Home() {
  const [movieInput, setMovieInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!movieInput.trim()) return;
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/analyzeMovie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieQuery: movieInput }),
    });

    const data = await res.json();
    setResponse(data.analysis || 'No analysis available.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          🎬 AI Movie Categorizer
        </h1>

        <textarea
          className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none text-gray-700 shadow-sm transition-all"
          rows={4}
          placeholder="Enter a movie title or plot summary..."
          value={movieInput}
          onChange={(e) => setMovieInput(e.target.value)}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-pulse text-center text-lg text-blue-500 font-semibold">
              🔍 Thinking like an AI movie buff...
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI Analysis Result</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
