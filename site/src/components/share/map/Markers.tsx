'use client';

import { icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Edit } from '@/components/icons';
import styles from './Markers.module.scss';
import { Castle } from '~api/routes/castles/castles.dto';
import { useEditCastle } from '@/hooks/useEditCastle';
import { useAtomValue } from 'jotai';
import { mapModeAtom } from '@/stores/mapMode';
import { MARKER_SELECT, MARKERS } from '@/consts/markers';

type Props = {
  data: Castle;
  isEdited: boolean;
};

export default function Markers({ data }: Props) {
  const { edit } = useEditCastle();
  const { editCastleId } = useEditCastle();
  const mode = useAtomValue(mapModeAtom);

  const isSelected = data.castleId === editCastleId;
  const markerIcon = icon({
    iconUrl: isSelected ? MARKER_SELECT.src : MARKERS[data.scale].src,
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
        <p className={styles.link}>{data.name}</p>
        {mode === 'edit' && <Edit className={styles.edit} onClick={selectEditMarker} />}
      </Popup>
    </Marker>
  );
}
