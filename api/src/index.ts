import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { WorkerEntrypoint } from 'cloudflare:workers';
import { appRouter } from './router';
import { createContext } from './lib/context';

const addCORSHeaders = (res: Response) => {
  const response = new Response(res.body, res);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Headers', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  return response;
};

export default class TRPCCloudflareWorkerExample extends WorkerEntrypoint<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return addCORSHeaders(
        new Response(null, {
          status: 204,
        }),
      );
    }

    const res = await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: (opts) => createContext({ ...opts, req: request, env: this.env }),
      onError: ({ error }) => {
        console.error('Error in TRPC handler:', error);
      },
    });

    return addCORSHeaders(res);
  }
}
