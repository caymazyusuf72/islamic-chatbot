'use client';

import { useState, useEffect, useCallback } from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
  supported: boolean;
}

export interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  clearError: () => void;
}

/**
 * Custom hook for accessing device geolocation
 * Handles permissions, errors, and loading states
 */
export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: false,
    error: null,
    supported: typeof window !== 'undefined' && 'geolocation' in navigator,
  });

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const requestLocation = useCallback(() => {
    if (!state.supported) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
          supported: true,
        });
      },
      (error) => {
        let errorMessage = 'Failed to get location';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }

        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },
      options
    );
  }, [state.supported]);

  // Auto-request location on mount (optional)
  useEffect(() => {
    // Uncomment to auto-request on mount
    // requestLocation();
  }, []);

  return {
    ...state,
    requestLocation,
    clearError,
  };
}