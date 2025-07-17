'use client';

import { LatLng, LeafletEventHandlerFnMap, icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import styles from './Markers.module.scss';
import markerEdit from '@/assets/markers/castle-edit.png';
import { useEditCastle } from '@/hooks/useEditCastle';
import { AddCastle } from '~api/routes/castles/castles.dto';

interface Props {
  castle: AddCastle | undefined;
}

export default function EditMarker({ castle }: Props) {
  const { setEditCastle } = useEditCastle();
  const markerIcon = icon({
    iconUrl: markerEdit.src,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -40],
  });

  const eventHandlers: LeafletEventHandlerFnMap = {
    dragend: (e) =>
      setEditCastle((prev) => {
        if (!prev) return prev;

        const latlng = e.target.getLatLng() as LatLng;
        return {
          ...prev,
          latitude: latlng.lat,
          longitude: latlng.lng,
        };
      }),
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
