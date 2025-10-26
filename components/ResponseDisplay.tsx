
import React from 'react';
import type { GeminiResponse } from '../types';

interface ResponseDisplayProps {
  response: GeminiResponse;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div className="w-full text-left animate-fade-in">
      <div className="prose prose-invert max-w-none text-gray-300">
          <p className="whitespace-pre-wrap">{response.text}</p>
      </div>
      
      {response.sources.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-cyan-400 mb-3 border-b border-gray-600 pb-2">
            Information Sources from Google Maps
          </h4>
          <ul className="space-y-2">
            {response.sources.map((source, index) => (
              <li key={index} className="flex items-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <a
                  href={source.maps.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  {source.maps.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
