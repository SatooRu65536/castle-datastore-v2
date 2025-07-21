import { MARKERS } from './markers';

export const ZOOM_SCALE_MAP: Record<number, number> = {
  7: 5,
  8: 5,
  9: 4,
  10: 3,
  11: 2,
  12: 2,
  13: 1,
  14: 1,
  15: 1,
  16: 1,
  17: 1,
};

export const SCALE_MAP = [
  {
    scale: 6,
    img: MARKERS[5],
    label: '日本100名城',
  },
  {
    scale: 5,
    img: MARKERS[4],
    label: '続日本100名城',
  },
  {
    scale: 4,
    img: MARKERS[3],
    label: '特別・国指定史跡',
  },
  {
    scale: 3,
    img: MARKERS[2],
    label: '地方公共団体指定史跡',
  },
  {
    scale: 2,
    img: MARKERS[1],
    label: '遺構あり',
  },
  {
    scale: 1,
    img: MARKERS[0],
    label: 'その他',
  },
];
