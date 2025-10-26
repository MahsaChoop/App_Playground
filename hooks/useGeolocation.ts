
import { useState, useEffect } from 'react';
import type { GeolocationState } from '../types';

export const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        loading: false,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({
        location: null,
        loading: false,
        error: `Failed to get location: ${error.message}. Please enable location services in your browser settings.`,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return state;
};
