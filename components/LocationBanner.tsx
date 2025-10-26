
import React from 'react';

interface LocationBannerProps {
    loading: boolean;
    error: string | null;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({ loading, error }) => {
    if (loading) {
        return (
            <div className="bg-blue-900/50 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Accessing Location... </strong>
                <span className="block sm:inline">Please wait while we determine your current location.</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Location Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }
    
    return (
        <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Location Acquired! </strong>
            <span className="block sm:inline">You can now select a topic to get local planning information.</span>
        </div>
    );
};
