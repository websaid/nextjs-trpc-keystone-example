import { translationRouter } from './translationRouter';
import { t } from '../trpc';

export const appRouter = t.router({
    translations: translationRouter
});

export type CmsAppRouter = typeof appRouter;