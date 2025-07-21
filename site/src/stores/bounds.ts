import { atom } from 'jotai';

export interface Bounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

export const boundsAtom = atom<Bounds | null>(null);
