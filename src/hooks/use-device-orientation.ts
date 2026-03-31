'use client';

import { useState, useEffect, useCallback } from 'react';

export interface DeviceOrientationState {
  alpha: number | null; // Compass heading (0-360)
  beta: number | null;  // Front-to-back tilt
  gamma: number | null; // Left-to-right tilt
  absolute: boolean;
  supported: boolean;
  permissionGranted: boolean | null;
  loading: boolean;
  error: string | null;
  needsCalibration: boolean;
}

export interface UseDeviceOrientationReturn extends DeviceOrientationState {
  requestPermission: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for accessing device orientation (compass)
 * Handles iOS 13+ permission requirements and calibration detection
 */
export function useDeviceOrientation(): UseDeviceOrientationReturn {
  const [state, setState] = useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
    supported: typeof window !== 'undefined' && 'DeviceOrientationEvent' in window,
    permissionGranted: null,
    loading: false,
    error: null,
    needsCalibration: false,
  });

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const requestPermission = useCallback(async () => {
    if (!state.supported) {
      setState(prev => ({
        ...prev,
        error: 'Device orientation is not supported',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Check if permission API exists (iOS 13+)
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        
        if (permission === 'granted') {
          setState(prev => ({
            ...prev,
            permissionGranted: true,
            loading: false,
          }));
        } else {
          setState(prev => ({
            ...prev,
            permissionGranted: false,
            loading: false,
            error: 'Device orientation permission denied',
          }));
        }
      } else {
        // Permission not required (Android, older iOS)
        setState(prev => ({
          ...prev,
          permissionGranted: true,
          loading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        permissionGranted: false,
        loading: false,
        error: 'Failed to request device orientation permission',
      }));
    }
  }, [state.supported]);

  useEffect(() => {
    if (!state.supported || !state.permissionGranted) {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma, absolute } = event;

      // Check if we need calibration (low accuracy)
      const needsCalibration = 
        alpha === null || 
        beta === null || 
        gamma === null ||
        !absolute;

      setState(prev => ({
        ...prev,
        alpha,
        beta,
        gamma,
        absolute: absolute || false,
        needsCalibration,
      }));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [state.supported, state.permissionGranted]);

  return {
    ...state,
    requestPermission,
    clearError,
  };
}

/**
 * Get compass heading adjusted for screen orientation
 * 
 * @param alpha - Device orientation alpha value
 * @returns Adjusted compass heading (0-360)
 */
export function getCompassHeading(alpha: number | null): number | null {
  if (alpha === null) return null;

  // Adjust for screen orientation
  let heading = alpha;

  if (typeof window !== 'undefined' && window.screen?.orientation) {
    const screenOrientation = window.screen.orientation.angle || 0;
    heading = (alpha + screenOrientation) % 360;
  }

  return heading;
}