import { client } from '@/client';
import { useCallback } from 'react';
import useSWR from 'swr';
import { AddTag } from '~api/routes/tags/tags.dto';

async function fetcher() {
  return await client.tags.list.query();
}

export function useTags() {
  const { data, error, isLoading, mutate } = useSWR(['tags'], fetcher);

  const add = useCallback(async (addTag: AddTag) => {
    await client.tags.add.mutate(addTag);
  }, []);

  return {
    tags: data,
    isLoading,
    error,
    add,
    mutate,
  };
}
