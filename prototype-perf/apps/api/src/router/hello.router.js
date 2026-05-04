import { HelloRequest } from 'shared';
import { loggedProcedure, router } from '../lib/trpc.js';
export const helloRouter = router({
    hello: loggedProcedure.input(HelloRequest).query(({ input }) => {
        return {
            greeting: `Hello ${input?.name ?? 'Maha-Perf'}!`,
            project: 'prototype-perf',
            architect: 'Architect',
            timestamp: new Date().toISOString(),
            stack: ['React 19', 'Vite', 'Hono', 'tRPC', 'TypeScript', 'TanStack Query'],
        };
    }),
    health: loggedProcedure.query(() => {
        return {
            status: 'healthy',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }),
});
