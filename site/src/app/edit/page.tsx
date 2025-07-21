import CastleMap from '@/components/share/map';
import EditInfo from './_components/EditInfo';
import styles from './page.module.scss';
import MapModeChanger from './_components/MapModeChanger';

export default function Page() {
  return (
    <main className={styles.edit}>
      <div className={styles.map}>
        <CastleMap />
      </div>
      <EditInfo />
      <MapModeChanger />
    </main>
  );
}
