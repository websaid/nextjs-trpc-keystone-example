import { translationRouter } from './translationRouter';
import { t } from '../trpc';
import { blogRouter } from './blogRouter';

export const appRouter = t.router({
    translations: translationRouter,
    blog: blogRouter
});

export type CmsAppRouter = typeof appRouter;