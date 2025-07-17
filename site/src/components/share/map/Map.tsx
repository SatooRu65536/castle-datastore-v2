'use client';

import { mapModeAtom } from '@/stores/mapMode';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { ArrowDown } from '@/components/icons';
import styles from './Map.module.scss';
import { usePathname } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { mapSettingsAtom } from '@/stores/mapSettints';
import { useEditCastle } from '@/hooks/useEditCastle';
import { DEFAULT_CENTER, DEFAULT_ZOOM, MAX_BOUNDS, ZOOM_MAX, ZOOM_MIN } from '@/consts/map';
import { useSetBounds } from '@/hooks/useBounds';
import { castlesAtom } from '@/stores/castles';
import Markers from './Markers';
import EditMarker from './EditMarker';

export default function CastleMap() {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={ZOOM_MIN}
      maxZoom={ZOOM_MAX}
      maxBounds={MAX_BOUNDS}
      scrollWheelZoom
      doubleClickZoom={false}
      zoomControl={false}
      className={styles.map_container}
    >
      <MoveDown />
      <CastleMarkers />
      <InnerMapContainer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

function CastleMarkers() {
  const castles = useAtomValue(castlesAtom);
  const { editCastle, editCastleId } = useEditCastle();

  if (castles.state !== 'hasData') return <></>;

  const nonSelectedCastles = castles.data.filter((c) => c.castleId !== editCastleId);

  return (
    <>
      {nonSelectedCastles.map((c) => (
        <Markers key={c.castleId} data={c} isEdited={false} />
      ))}
      {editCastle !== null && <EditMarker castle={editCastle} />}
    </>
  );
}

function InnerMapContainer() {
  const setBounds = useSetBounds();
  const mode = useAtomValue(mapModeAtom);
  const setMapSettings = useSetAtom(mapSettingsAtom);
  const { add } = useEditCastle();

  useMapEvents({
    moveend: (e) => {
      setBounds(e.target.getBounds());
      setMapSettings((prev) => ({ ...prev, center: e.target.getCenter() }));
    },
    zoomend: (e) => {
      setBounds(e.target.getBounds());
      setMapSettings((prev) => ({ ...prev, zoom: e.target.getZoom() }));
    },
    layeradd: (e) => {
      setBounds(e.target.getBounds());
      setMapSettings((prev) => ({ ...prev, zoom: e.target.getZoom() }));
    },
    dblclick: (e) => {
      if (mode !== 'edit') return;
      add(e.latlng);
    },
  });

  return <div />;
}

function MoveDown() {
  const path = usePathname();
  const isHide = ['/map', '/'].includes(path);

  function moveDown() {
    if (window === undefined) return;

    const y = window.scrollY + window.innerHeight * 0.5;
    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }

  return <ArrowDown className={`${styles.move_down} ${isHide && styles.hide}`} onClick={moveDown} />;
}
