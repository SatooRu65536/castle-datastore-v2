'use client';

import Card from '@/components/share/card';
import { Suspense } from 'react';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai';
import { castleInfoAtom } from '@/stores/castleInfo';
import { formatDate } from '@/utils/date';

export default function Data() {
  return (
    <Card className={styles.data_card}>
      <Suspense fallback={<p>取得中...</p>}>
        <CastleInfoComponent />
      </Suspense>
    </Card>
  );
}

function CastleInfoComponent() {
  const info = useAtomValue(castleInfoAtom);
  const num = info?.num ?? 0;
  const updateAt = formatDate(new Date(info?.updatedAt));

  return (
    <>
      <h3>登録情報</h3>
      <div className={styles.box}>
        <p>登録数: {num}城</p>
        <p>最終更新: {updateAt}</p>
      </div>
    </>
  );
}
