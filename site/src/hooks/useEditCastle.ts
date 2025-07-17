import { client } from '@/client';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { AddCastle, Castle } from '~api/routes/castles/castles.dto';
import { Uuid } from '~api/index.dto';
import { LatLng } from 'leaflet';

const editCastleAtom = atom<AddCastle>();
const editCastleIdAtom = atom<Uuid>();

export function useEditCastle() {
  const [editCastle, setEditCastle] = useAtom(editCastleAtom);
  const [editCastleId, setEditCastleId] = useAtom(editCastleIdAtom);

  const add = useCallback(
    (latlng: LatLng) => {
      setEditCastle({
        aka: [],
        name: '',
        latitude: latlng.lat,
        longitude: latlng.lng,
        description: '',
        structures: [],
        tags: [],
      });
    },
    [setEditCastle],
  );

  const edit = useCallback(
    (castle: Castle) => {
      setEditCastle(castle);
      setEditCastleId(castle.castleId);
    },
    [setEditCastle, setEditCastleId],
  );

  const cancel = useCallback(() => {
    setEditCastle(undefined);
  }, [setEditCastle]);

  const submit = useCallback(async () => {
    if (!editCastle) return;

    await client.castles.add.mutate(editCastle);
    setEditCastle(undefined);
    setEditCastleId(undefined);
  }, [editCastle, setEditCastle, setEditCastleId]);

  return {
    editCastle,
    editCastleId,
    setEditCastle,
    setEditCastleId,
    add,
    edit,
    submit,
    cancel,
  };
}
