import { z } from "zod";
import { languageOptions } from "../../schema";
import { t } from "../trpc";

export const translationRouter = t.router({
  translation: t.procedure
    .input(z.object({
      option: languageOptions
    }))
    .query(async ({ ctx, input: {option} }) => {
      const data = (await ctx.keystoneCtx.prisma.translation.findUniqueOrThrow({
        where: {
          language: option
        }
      }))

      return data;
    }),
  translationOptions: t.procedure
    .query(async ({ ctx }) => {
      const options = (await ctx.keystoneCtx.prisma.translation.findMany({
        select: {
          language: true
        }
      }))

      return options;
    })
});
// export type definition of API
