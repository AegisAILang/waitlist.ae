import 'server-only';
import { auth } from '@/server1/auth';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { trpc } from '@/trpc/trpc';
import Waitlist from '@/components/waitlist';

export default async function Home() {
  const postsQuery = trpc.post.getLatest.useQuery();
  const hello = postsQuery.data;
  const session = await auth();

  return (
    <HydrationBoundary state={dehydrate(postsQuery)}>
      <Waitlist hello={hello} session={session} />
    </HydrationBoundary>
  );
}
