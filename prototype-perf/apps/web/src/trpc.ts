import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'api';

/**
 * tRPC hooks for React components (TanStack Query integration).
 * Used inside .tsx components with useQuery/useMutation.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Standalone tRPC client (no React hook dependency).
 * Used for non-reactive API calls or outside React components.
 */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/trpc',
    }),
  ],
});

export type { AppRouter } from 'api';
