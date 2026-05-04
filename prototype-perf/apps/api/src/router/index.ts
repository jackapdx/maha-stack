import { helloRouter } from './hello.router.js';

export const appRouter = helloRouter;

export type AppRouter = typeof appRouter;
