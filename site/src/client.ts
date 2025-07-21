import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '~api/router';
import superjson from 'superjson';

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787/trpc',
      transformer: superjson,
    }),
  ],
});
