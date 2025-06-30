"use client"
import { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!files || files.length === 0) {
      setError("Please select PDF files to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('/api/project-analyzer', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorData.error || 'No specific error message.'}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err: any) {
      console.error('Error analyzing project:', err);
      setError(`Failed to analyze project: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-xl my-10">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Project Analyzer (PDFs Only)
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="pdf-upload" className="block text-sm font-medium text-gray-700">
            Upload your project PDFs:
          </label>
          <input
            id="pdf-upload"
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm
                     text-lg font-medium text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {loading ? 'Analyzing...' : 'Analyze Project'}
        </button>
      </form>

      {error && (
        <p className="mt-6 text-center text-red-600 font-medium p-3 bg-red-50 rounded-md border border-red-200">
          {error}
        </p>
      )}

      {analysis && (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Analysis Results:
          </h2>
          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
            <p className="whitespace-pre-wrap">{analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}