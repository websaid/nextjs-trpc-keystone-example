import { t } from "../trpc";

export const translationRouter = t.router({
  translations: t.procedure.query(async ({ ctx }) => {
    const data = (await ctx.keystoneCtx.prisma.translation.findMany({}))

    return data;
  }),
});
// export type definition of API
