import { ZOOM_SCALE_MAP } from '@/consts/scales';
import { client } from '../client';
import { Bounds, boundsAtom } from '@/stores/bounds';
import { mapSettingsAtom } from '@/stores/mapSettints';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import useSWR from 'swr';

async function fetcher([, { bounds, zoom }]: [string, { bounds: Bounds; zoom: number }]) {
  if (!bounds) return [];

  return await client.castles.list.query({
    maxLatitude: bounds.north,
    minLatitude: bounds.south,
    maxLongitude: bounds.east,
    minLongitude: bounds.west,
    minScale: ZOOM_SCALE_MAP[zoom],
    maxResults: 100,
  });
}

export const refreshAtom = atom(0);

export function useCastles() {
  const bounds = useAtomValue(boundsAtom);
  const { zoom } = useAtomValue(mapSettingsAtom);
  const count = useAtomValue(refreshAtom);
  const { data, error, isLoading, mutate } = useSWR(['castles', { bounds, zoom, count }], fetcher);

  return {
    castles: data,
    isLoading,
    error,
    mutate,
  };
}

export function useCastlesRefresh() {
  const setCount = useSetAtom(refreshAtom);
  return () => setCount((prev) => prev + 1);
}
