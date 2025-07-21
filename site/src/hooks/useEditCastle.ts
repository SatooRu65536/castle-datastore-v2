import { client } from '@/client';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import type { AddCastle, Castle } from '~api/routes/castles/castles.dto';
import { Uuid } from '~api/index.dto';
import { LatLng } from 'leaflet';
import { useCastlesRefresh } from './useCastles';
import { StructuresStatus } from '@/types/structures';

const editCastleAtom = atom<AddCastle>();
const editCastleIdAtom = atom<Uuid>();

export function useEditCastle() {
  const [editingCastle, setEditingCastle_] = useAtom(editCastleAtom);
  const [editingCastleId, setEditingCastleId] = useAtom(editCastleIdAtom);
  const refresh = useCastlesRefresh();
  const isNew = editingCastleId === undefined;

  const setEditingCastle = useCallback(
    (props: Partial<AddCastle>) => {
      setEditingCastle_((prev) => {
        if (!prev) return prev;
        return { ...prev, ...props };
      });
    },
    [setEditingCastle_],
  );

  // 現存の構造物
  const setStructures = useCallback(
    (structs: string[], status: StructuresStatus) => {
      setEditingCastle_((prev) => {
        if (!prev) return prev;

        const structures = prev.structures;
        const filteredStructures = structures.filter((s) => s.status !== status);

        const targetStructures = structs.map((s) => ({ name: s, status }));
        return { ...prev, structures: [...filteredStructures, ...targetStructures] };
      });
    },
    [setEditingCastle_],
  );

  const add = useCallback(
    (latlng: LatLng) => {
      setEditingCastle_({
        aka: [],
        name: '',
        latitude: latlng.lat,
        longitude: latlng.lng,
        description: '',
        structures: [],
        tags: [],
      });
    },
    [setEditingCastle_],
  );

  const edit = useCallback(
    (castle: Castle) => {
      setEditingCastle_({
        aka: castle.aka,
        name: castle.name,
        latitude: castle.latitude,
        longitude: castle.longitude,
        description: castle.description,
        structures: castle.structures,
        tags: castle.tags,
      });
      setEditingCastleId(castle.castleId);
    },
    [setEditingCastle_, setEditingCastleId],
  );

  const cancel = useCallback(() => {
    setEditingCastle_(undefined);
  }, [setEditingCastle_]);

  const submit = async () => {
    if (!editingCastle) return;
    if (isNew) await client.castles.add.mutate(editingCastle);
    else await client.castles.update.mutate({ ...editingCastle, castleId: editingCastleId });

    setEditingCastle_(undefined);
    setEditingCastleId(undefined);
    refresh();
  };

  const remove = async () => {
    if (!editingCastleId) return;

    await client.castles.delete.mutate({ castleId: editingCastleId });
  };

  const existingStructures = editingCastle?.structures?.filter((s) => s.status === StructuresStatus.Existing) ?? [];
  const ruinedStructures = editingCastle?.structures?.filter((s) => s.status === StructuresStatus.Ruined) ?? [];
  const restorationStructures =
    editingCastle?.structures?.filter((s) => s.status === StructuresStatus.Restoration) ?? [];
  const reconstructionStructures =
    editingCastle?.structures?.filter((s) => s.status === StructuresStatus.Reconstruction) ?? [];
  const unknownStructures = editingCastle?.structures?.filter((s) => s.status === StructuresStatus.Unknown) ?? [];

  // キーをStructuresStatusに基づいて構造体をマッピング
  const structures: Record<StructuresStatus, string[]> = {
    [StructuresStatus.Existing]: existingStructures.map((s) => s.name),
    [StructuresStatus.Ruined]: ruinedStructures.map((s) => s.name),
    [StructuresStatus.Restoration]: restorationStructures.map((s) => s.name),
    [StructuresStatus.Reconstruction]: reconstructionStructures.map((s) => s.name),
    [StructuresStatus.Unknown]: unknownStructures.map((s) => s.name),
  };

  return {
    isNew,
    editingCastle,
    editingCastleId,
    structures,
    setEditingCastle,
    setStructures,
    add,
    edit,
    submit,
    remove,
    cancel,
  } as const;
}

export type UseEditCastle = ReturnType<typeof useEditCastle>;
