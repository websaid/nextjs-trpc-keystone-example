import { httpBatchLink } from "@trpc/client";
import { createTRPCProxyClient } from "@trpc/react";
import { CmsAppRouter } from "../../cms/trpc/routes";
import superjson from 'superjson';

export const cmsTrpc = createTRPCProxyClient<CmsAppRouter>({ 
    links: [
        httpBatchLink({
            url: "http://localhost:4000/trpc",
        }),
    ],
    transformer: superjson
});
