import CastleMap from '@/components/share/map';
import styles from './index.module.scss';
import Link from 'next/link';

export default function MiniMap() {
  return (
    <Link href="/map" className={styles.map}>
      <div className={styles.filter}>
        <p>マップへ移動する</p>
      </div>
      <CastleMap />
    </Link>
  );
}
