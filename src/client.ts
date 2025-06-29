import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from './router';

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8787/trpc',
    }),
  ],
});
