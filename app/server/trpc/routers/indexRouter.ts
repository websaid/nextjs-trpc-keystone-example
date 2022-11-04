import { prisma } from "../prisma";
import { t } from "../trpc";

export const indexRouter = t.router({
    getTestimonials: t.procedure
        .query(async () => {
            return await prisma.testimonials.findMany({})
        }),

})

