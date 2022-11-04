import { httpBatchLink } from "@trpc/client";
import { createTRPCProxyClient, createTRPCReact } from "@trpc/react-query";
import { CmsAppRouter } from "../../cms/trpc/routes";
import superjson from 'superjson';
import { AppRouter } from "server/trpc/router";
import { SSRContext } from "server/trpc/trpc";

export const trpc = createTRPCReact<AppRouter, SSRContext>();

export const cmsTrpc = createTRPCProxyClient<CmsAppRouter>({ 
    links: [
        httpBatchLink({
            url: "http://localhost:4000/trpc",
        }),
    ],
    transformer: superjson
});
