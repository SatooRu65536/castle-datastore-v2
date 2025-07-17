import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '~api/router';
import superjson from 'superjson';

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8787/trpc',
      transformer: superjson,
    }),
  ],
});
