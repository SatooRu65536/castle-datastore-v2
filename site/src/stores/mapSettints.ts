import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/consts/map';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { atom } from 'jotai';
import { LatLng } from 'leaflet';

interface MapSettings {
  center: LatLng;
  zoom: number;
}

const mapSettingsAtom_ = atom<MapSettings>(
  getLocalStorage<MapSettings>('mapSettings', {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  }),
);

export const mapSettingsAtom = atom(
  (get) => get(mapSettingsAtom_),
  (get, set, newSettings: Partial<MapSettings>) => {
    const currentSettings = get(mapSettingsAtom_);
    const updatedSettings = {
      ...currentSettings,
      ...newSettings,
    };
    set(mapSettingsAtom_, updatedSettings);
    setLocalStorage('mapSettings', updatedSettings);
  },
)
