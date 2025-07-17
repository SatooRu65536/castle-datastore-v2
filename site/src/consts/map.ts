import { LatLng, LatLngBounds } from 'leaflet';

export const DEFAULT_CENTER: LatLng = new LatLng(35.1855, 136.89939);
export const DEFAULT_ZOOM = 7;
export const ZOOM_MAX = 17;
export const ZOOM_MIN = 7;

const sw = new LatLng(55, 160);
const ne = new LatLng(18, 115);
export const MAX_BOUNDS = new LatLngBounds(sw, ne);
