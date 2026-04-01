'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/i18n';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface QiblaMapProps {
  userLocation: { lat: number; lng: number };
  qiblaDirection: number;
  distance: number;
  isDarkMode?: boolean;
}

// Custom icons
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: rgb(59, 130, 246);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const createKaabaIcon = () => {
  return L.divIcon({
    className: 'custom-kaaba-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: rgb(16, 185, 129);
        border: 3px solid white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <rect x="6" y="8" width="12" height="12" rx="1"/>
          <path d="M12 4 L12 8 M8 8 L16 8"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
};

// Component to handle map view updates
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function QiblaMap({ userLocation, qiblaDirection, distance, isDarkMode = false }: QiblaMapProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [mounted, setMounted] = useState(false);

  const kaabaLocation = { lat: 21.4225, lng: 39.8262 };
  
  // Calculate appropriate zoom level based on distance
  const getZoomLevel = () => {
    if (distance < 500) return 6;
    if (distance < 1000) return 5;
    if (distance < 2000) return 4;
    if (distance < 5000) return 3;
    return 2;
  };

  // Calculate center point between user and Kaaba
  const centerLat = (userLocation.lat + kaabaLocation.lat) / 2;
  const centerLng = (userLocation.lng + kaabaLocation.lng) / 2;

  // Tile layer URLs
  const tileUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const attribution = isDarkMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={getZoomLevel()}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapViewController center={[centerLat, centerLng]} zoom={getZoomLevel()} />
        
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />

        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserIcon()}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold mb-1">{t('qibla.yourLocation')}</div>
              <div className="text-xs text-muted-foreground">
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Kaaba Location Marker */}
        <Marker position={[kaabaLocation.lat, kaabaLocation.lng]} icon={createKaabaIcon()}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold mb-1">{t('qibla.kaaba')}</div>
              <div className="text-xs text-muted-foreground">
                {t('qibla.mecca')}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Line connecting user to Kaaba */}
        <Polyline
          positions={[
            [userLocation.lat, userLocation.lng],
            [kaabaLocation.lat, kaabaLocation.lng],
          ]}
          pathOptions={{
            color: 'rgb(16, 185, 129)',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
          }}
        />
      </MapContainer>

      {/* Map Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border z-[1000]">
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{t('qibla.yourLocation')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span>{t('qibla.kaaba')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-emerald-500 opacity-70" style={{ borderTop: '2px dashed' }}></div>
            <span>{distance.toLocaleString()} km</span>
          </div>
        </div>
      </div>
    </div>
  );
}