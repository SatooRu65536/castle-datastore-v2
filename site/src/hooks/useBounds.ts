import { boundsAtom } from '@/stores/bounds';
import { useSetAtom } from 'jotai';
import { LatLngBounds } from 'leaflet';
import { useCallback } from 'react';

export function useSetBounds() {
  const setBounds_ = useSetAtom(boundsAtom);

  const setBounds = useCallback(
    (bounds: LatLngBounds) => {
      setBounds_({
        south: bounds.getSouth(),
        west: bounds.getWest(),
        north: bounds.getNorth(),
        east: bounds.getEast(),
      });
    },
    [setBounds_],
  );

  return setBounds;
}
