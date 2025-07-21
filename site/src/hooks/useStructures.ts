import { client } from '@/client';
import { useCallback } from 'react';
import useSWR from 'swr';
import { AddStructure } from '~api/routes/structures/structures.dto';

async function fetcher() {
  return await client.structures.list.query();
}

export function useStructures() {
  const { data, error, isLoading, mutate } = useSWR(['structures'], fetcher);

  const add = useCallback(async (addStructure: AddStructure) => {
    await client.structures.add.mutate(addStructure);
  }, []);

  return {
    structures: data,
    isLoading,
    error,
    add,
    mutate,
  };
}
