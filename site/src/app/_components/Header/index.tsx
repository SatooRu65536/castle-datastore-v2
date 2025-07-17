'use client';

import { EditLocation, Mapview } from '@/components/icons';
import { Noto_Serif_JP } from 'next/font/google';
import styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { mapModeAtom } from '@/stores/mapMode';
import Link from 'next/link';

const noto_serif = Noto_Serif_JP({ subsets: ['latin'], weight: '700' });

export default function Header() {
  const mode = useAtomValue(mapModeAtom);
  const path = usePathname();
  const showView = path === '/' || mode === 'edit';

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/" className={noto_serif.className}>
          Castle Datastore
        </Link>
      </h1>

      {showView ? <View /> : <Edit />}
    </header>
  );
}

function View() {
  return (
    <a href="/map" className={styles.anchor}>
      <span>探す</span>
      <Mapview className={styles.search_icon} />
    </a>
  );
}

function Edit() {
  return (
    <a href="/edit" className={styles.anchor}>
      <span>編集する</span>
      <EditLocation className={styles.icon} />
    </a>
  );
}
