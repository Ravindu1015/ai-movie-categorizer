'use client';
import { useState } from 'react';

export default function Home() {
  const [movieInput, setMovieInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/analyzeMovie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieQuery: movieInput }),
    });

    const data = await res.json();
    setResponse(data.analysis || 'No data.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">AI Movie Categorizer 🎬</h1>
      <textarea
        className="w-full p-4 rounded shadow mb-4"
        rows={4}
        placeholder="Enter a movie title or plot..."
        value={movieInput}
        onChange={(e) => setMovieInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded">
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {response && (
        <div className="mt-8 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <pre className="whitespace-pre-wrap mt-2">{response}</pre>
        </div>
      )}
    </div>
  );
}