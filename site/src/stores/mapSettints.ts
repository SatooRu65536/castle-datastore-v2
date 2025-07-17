import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/consts/map';
import { atom } from 'jotai';

interface MapSettings {
  center: [number, number];
  zoom: number;
}

export const mapSettingsAtom = atom<MapSettings>({
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,
});
