/**
 * Qibla Direction Calculator
 * Calculates the direction to Kaaba from any location on Earth
 */

// Kaaba coordinates (Mecca, Saudi Arabia)
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculate the Qibla direction from a given location
 * Uses the Haversine formula and spherical trigonometry
 * 
 * @param userLat - User's latitude in degrees
 * @param userLng - User's longitude in degrees
 * @returns Qibla direction in degrees (0-360, where 0 = North, 90 = East)
 */
export function calculateQiblaDirection(
  userLat: number,
  userLng: number
): number {
  // Convert to radians
  const lat1 = toRadians(userLat);
  const lng1 = toRadians(userLng);
  const lat2 = toRadians(KAABA_LAT);
  const lng2 = toRadians(KAABA_LNG);

  // Calculate the difference in longitude
  const dLng = lng2 - lng1;

  // Calculate the bearing using spherical trigonometry
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - 
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x);
  
  // Convert to degrees
  bearing = toDegrees(bearing);
  
  // Normalize to 0-360
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

/**
 * Calculate the distance to Kaaba from a given location
 * Uses the Haversine formula
 * 
 * @param userLat - User's latitude in degrees
 * @param userLng - User's longitude in degrees
 * @returns Distance in kilometers
 */
export function calculateDistanceToKaaba(
  userLat: number,
  userLng: number
): number {
  const R = 6371; // Earth's radius in kilometers
  
  const lat1 = toRadians(userLat);
  const lng1 = toRadians(userLng);
  const lat2 = toRadians(KAABA_LAT);
  const lng2 = toRadians(KAABA_LNG);
  
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;
  
  return Math.round(distance);
}

/**
 * Get cardinal direction name from degrees
 * 
 * @param degrees - Direction in degrees (0-360)
 * @returns Cardinal direction key for i18n
 */
export function getCardinalDirection(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  
  if (normalized >= 337.5 || normalized < 22.5) return 'qibla.north';
  if (normalized >= 22.5 && normalized < 67.5) return 'qibla.northeast';
  if (normalized >= 67.5 && normalized < 112.5) return 'qibla.east';
  if (normalized >= 112.5 && normalized < 157.5) return 'qibla.southeast';
  if (normalized >= 157.5 && normalized < 202.5) return 'qibla.south';
  if (normalized >= 202.5 && normalized < 247.5) return 'qibla.southwest';
  if (normalized >= 247.5 && normalized < 292.5) return 'qibla.west';
  if (normalized >= 292.5 && normalized < 337.5) return 'qibla.northwest';
  
  return 'qibla.north';
}

/**
 * Get location name from coordinates using reverse geocoding
 * Falls back to coordinates if geocoding fails
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Location name or coordinates
 */
export async function getLocationName(lat: number, lng: number): Promise<string> {
  try {
    // Use OpenStreetMap Nominatim API for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'NurAI Islamic App',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    // Extract city/town name
    const address = data.address;
    const locationName = 
      address.city || 
      address.town || 
      address.village || 
      address.county || 
      address.state || 
      address.country ||
      `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    
    return locationName;
  } catch (error) {
    // Fallback to coordinates
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

/**
 * Validate coordinates
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns True if coordinates are valid
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  return (
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}