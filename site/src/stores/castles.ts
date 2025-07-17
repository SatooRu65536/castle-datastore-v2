import { client } from '@/client';
import { ZOOM_SCALE_MAP } from '@/consts/scales';
import { boundsAtom } from '@/stores/bounds';
import { mapSettingsAtom } from '@/stores/mapSettints';
import { atomWithRefresh, loadable } from 'jotai/utils';

export const castlesAtom = loadable(
  atomWithRefresh(async (get) => {
    const bounds = get(boundsAtom);
    const { zoom } = get(mapSettingsAtom);

    if (zoom === null || bounds === null) return [];

    const minScale = ZOOM_SCALE_MAP[zoom ?? 0] ?? 1;
    const castles = await client.castles.list.query({
      minScale,
      minLatitude: bounds.south,
      maxLatitude: bounds.north,
      minLongitude: bounds.west,
      maxLongitude: bounds.east,
      maxResults: 100,
    });

    return castles;
  }),
);
