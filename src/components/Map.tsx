import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_MAP_CENTER } from '../constants';
import MapMarker from './MapMarker';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: DEFAULT_MAP_CENTER,
            zoom: 12,
            attributionControl: true
        })

        map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on('load', () => {
            setMapInstance(map.current)
        })

        map.current.on('error', (e) => {
            console.error('Mapbox error:', e);
        });

        return () => {
            map.current?.remove();
            setMapInstance(null);
        }
    }, []);

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '100vh',
                position: 'absolute',
                top: 0,
                bottom: 0
            }}
        >
            {mapInstance && (
                <MapMarker 
                    map={mapInstance}
                    coordinates={DEFAULT_MAP_CENTER}
                    popupContent='Test Popup'
                />
            )}
            </div>
    )
}