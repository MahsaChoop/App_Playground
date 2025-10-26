
import React, { useState, useCallback, useEffect } from 'react';
import { getDisasterPlan } from './services/geminiService';
import type { GeminiResponse, LatLng } from './types';
import { useGeolocation } from './hooks/useGeolocation';
import { PlanCard } from './components/PlanCard';
import { ResponseDisplay } from './components/ResponseDisplay';
import { Spinner } from './components/Spinner';
import { LocationBanner } from './components/LocationBanner';
import { planningTopics } from './constants';

const App: React.FC = () => {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const [apiResponse, setApiResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = useCallback(async (topic: { title: string; prompt: string }) => {
    if (!location) {
      setError("Location is not available. Please enable location services to get personalized information.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setApiResponse(null);
    setSelectedTopic(topic.title);

    try {
      const response = await getDisasterPlan(topic.prompt, location);
      setApiResponse(response);
    } catch (err) {
      setError("Failed to get planning information. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold text-cyan-400">
                Pandemic Disaster Planner
            </h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm0 1.5c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 3v4.5l3.75 2.25.75-1.23-3-1.77V6zm0 0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6V4.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 6V4.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 11H4.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 13H4.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 11h1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13h1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 18v1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 18v1.5" />
            </svg>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <LocationBanner loading={geoLoading} error={geoError} />

        {location && (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Choose a Planning Topic</h2>
              <p className="text-gray-400 mb-6">Select a category to get AI-powered, up-to-date local information for disease outbreak preparedness.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {planningTopics.map((topic) => (
                  <PlanCard 
                    key={topic.title} 
                    {...topic}
                    onClick={() => handleTopicSelect(topic)}
                    isSelected={selectedTopic === topic.title}
                  />
                ))}
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 shadow-2xl min-h-[20rem] flex items-center justify-center">
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <div className="text-center text-red-400">
                  <p className="font-bold">An Error Occurred</p>
                  <p>{error}</p>
                </div>
              ) : apiResponse ? (
                <ResponseDisplay response={apiResponse} />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-lg">Your personalized disaster plan will appear here.</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Information provided is for planning purposes and is not a substitute for official medical or emergency advice.</p>
      </footer>
    </div>
  );
};

export default App;
