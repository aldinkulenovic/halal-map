export type MapMarkerProps = {
    map: mapboxgl.Map;
    coordinates: [number, number];
    onClick?: () => void;
    popupContent?: string;
}

export type MapPopupProps = {
    content: string;
}