import { t } from "../trpc";

export const blogRouter = t.router({
    published: t.procedure.query(async ({ ctx }) => {
        const data = (await ctx.keystoneCtx.prisma.post.findMany({}))

        return data;
    }),
});
// export type definition of API
