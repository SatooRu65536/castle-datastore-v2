import { LatLng, LatLngBounds } from 'leaflet';

export const DEFAULT_CENTER: [number, number] = [35.1855, 136.89939];
export const DEFAULT_ZOOM = 7;
export const ZOOM_MAX = 7;
export const ZOOM_MIN = 17;

const sw = new LatLng(55, 160);
const ne = new LatLng(18, 115);
export const MAX_BOUNDS = new LatLngBounds(sw, ne);
