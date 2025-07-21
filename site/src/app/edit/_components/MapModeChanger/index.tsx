'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { mapModeAtom } from '@/stores/mapMode';

export default function MapModeChanger() {
  const setMapModeState = useSetAtom(mapModeAtom);

  useEffect(() => {
    setMapModeState('edit');

    return () => {
      setMapModeState('view');
    };
  }, [setMapModeState]);

  return <></>;
}
