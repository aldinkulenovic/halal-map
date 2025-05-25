import type { MapPopupProps } from "../types";

export function createPopupHTML({ content }: MapPopupProps) {
    return `
        <div class="mapboxgl-popup-content">
            <div class="px-3 py-2 text-sm rounded shadow-sm">
                ${content}
            </div>
        </div>
    `
}