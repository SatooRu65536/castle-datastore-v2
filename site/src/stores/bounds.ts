import { atom } from 'jotai';

interface Bounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

export const boundsAtom = atom<Bounds | null>(null);
