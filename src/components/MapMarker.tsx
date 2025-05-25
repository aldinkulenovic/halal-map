import type { MapMarkerProps } from "../types";
import { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import { createPopupHTML } from "./MapPopup";

export default function MapMarker({ map, coordinates, onClick, popupContent}: MapMarkerProps) {
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        markerRef.current = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        if (popupContent) {
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(createPopupHTML({ content: popupContent }));
            markerRef.current.setPopup(popup);
        }

        if (onClick) {
            markerRef.current.getElement().addEventListener('click', onClick);
        }

        return () => {
            if (onClick) {
                markerRef.current?.getElement().removeEventListener('click', onClick);
            }
            markerRef.current?.remove();
        };
    }, [map, coordinates, onClick, popupContent]);

    return null;
}