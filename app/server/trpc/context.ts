import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

interface CreateContextOptions {
  // session: Session | null
  opts?: trpcNext.CreateNextContextOptions,
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner({ opts }: CreateContextOptions) {

  return { opts };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts?: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner({ opts });
}