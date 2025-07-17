import { client } from '@/client';
import { atom } from 'jotai';

export const castleInfoAtom = atom(async () => await client.castles.info.query());
