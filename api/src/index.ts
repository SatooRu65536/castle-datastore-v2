import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { WorkerEntrypoint } from 'cloudflare:workers';
import { appRouter } from './router';
import { createContext } from './lib/context';

export default class TRPCCloudflareWorkerExample extends WorkerEntrypoint<Env> {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: (opts) => createContext({ ...opts, req: request, env: this.env }),
      onError: ({ error }) => {
        console.error('Error in TRPC handler:', error);
      },
    });
  }
}
