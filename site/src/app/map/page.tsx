import CastleMap from '@/components/share/map';
import styles from './page.module.scss';

export default function Page() {
  return (
    <main className={styles.map}>
      <CastleMap />
    </main>
  );
}
