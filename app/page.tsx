import "server-only";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Waitlist from "@/components/waitlist";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Waitlist hello={hello} session={session} />
    </HydrateClient>
  );
}
