'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function DynamicMap() {
  const DynamicMap = dynamic(() => import('@/components/share/map/Map'), {
    ssr: false,
  });

  return (
    <Suspense>
      <DynamicMap />
    </Suspense>
  );
}
