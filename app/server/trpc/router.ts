import { t } from './trpc';
import { indexRouter } from './routers/indexRouter';

export const appRouter = t.router({
  greeting: t.procedure.query(() => 'hello from tRPC v10!'),
  index: indexRouter
})

export type AppRouter = typeof appRouter;
