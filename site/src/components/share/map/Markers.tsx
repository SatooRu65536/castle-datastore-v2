'use client';

import { icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Edit } from '@/components/icons';
import styles from './Markers.module.scss';
import { Castle } from '~api/routes/castles/castles.dto';
import { useAtomValue } from 'jotai';
import { mapModeAtom } from '@/stores/mapMode';
import { MARKERS } from '@/consts/markers';
import { UseEditCastle } from '@/hooks/useEditCastle';
import { memo } from 'react';

interface Props {
  data: Castle;
  isEdited: boolean;
  edit: UseEditCastle['edit'];
}

function Markers({ data, edit }: Props) {
  const mode = useAtomValue(mapModeAtom);
  const markerIcon = icon({
    iconUrl: MARKERS.at(data.scale - 1)?.src ?? MARKERS[0].src,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -40],
  });

  function selectEditMarker() {
    if (mode === 'edit') edit(data);
  }

  return (
    <Marker position={[data.latitude, data.longitude]} icon={markerIcon}>
      <Popup className={styles.popup}>
        <p className={styles.link}>
          {data.name}
          {mode === 'edit' && <Edit className={styles.edit} onClick={selectEditMarker} />}
        </p>
      </Popup>
    </Marker>
  );
}

export default memo(Markers);
