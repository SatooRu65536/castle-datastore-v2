import { atom } from 'jotai';

export const mapModeAtom = atom<'edit' | 'view'>('view');
