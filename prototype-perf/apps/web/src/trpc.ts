import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'api';

/** Safely resolve the API URL from Vite env vars. */
function getApiUrl(): string {
  try {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/trpc';
  } catch {
    return 'http://localhost:3000/trpc';
  }
}

/**
 * Standalone tRPC client.
 * Use this for API calls from Svelte components or vanilla TS code.
 */
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getApiUrl(),
    }),
  ],
});

export type { AppRouter } from 'api';
