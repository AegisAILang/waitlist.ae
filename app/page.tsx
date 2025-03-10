import 'server-only';
import Waitlist from '@/components/waitlist';

export default async function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <Waitlist />
      </main>
    </div>
  );
}
