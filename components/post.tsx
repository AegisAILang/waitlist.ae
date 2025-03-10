'use client';
import { useState } from 'react';
import { trpc } from '@/trpc/trpc';
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function LatestPost() {
  const queryClient = useQueryClient();
  const { data: latestPost } = useSuspenseQuery(
    trpc.post.getLatest.queryOptions(),
  );
  const [name, setName] = useState('');
  const createPost = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.post.pathFilter());
        setName('');
      },
    }),
  );

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.text}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate();
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
