'use client';

import { LatLng, LeafletEventHandlerFnMap, icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import styles from './Markers.module.scss';
import { UseEditCastle } from '@/hooks/useEditCastle';
import { AddCastle } from '~api/routes/castles/castles.dto';
import { MARKER_SELECT } from '@/consts/markers';

interface Props {
  castle: AddCastle | undefined;
  setEditingCastle: UseEditCastle['setEditingCastle'];
}

export default function EditMarker({ castle, setEditingCastle }: Props) {
  const markerIcon = icon({
    iconUrl: MARKER_SELECT.src,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -40],
  });

  const eventHandlers: LeafletEventHandlerFnMap = {
    dragend: (e) => {
      const latlng = e.target.getLatLng() as LatLng;
      setEditingCastle({
        latitude: latlng.lat,
        longitude: latlng.lng,
      });
    },
  };

  if (!castle) return <></>;

  return (
    <Marker position={[castle.latitude, castle.longitude]} icon={markerIcon} eventHandlers={eventHandlers} draggable>
      <Popup className={styles.popup}>
        <p className={styles.link}>{castle.name}</p>
      </Popup>
    </Marker>
  );
}
