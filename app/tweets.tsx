"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, updateOptimisticTweets] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(
    tweets,
    (currentOptimisticTweets, newTweet) => {
      const newOptimisticTweets = [...currentOptimisticTweets];
      const index = newOptimisticTweets.findIndex(
        (tweet) => tweet.id === newTweet.id
      );
      newOptimisticTweets[index] = newTweet;
      return newOptimisticTweets;
    }
  );

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tweets" },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return optimisticTweets?.map((tweet) => (
    <div key={tweet.id} className="flex p-4 hover:bg-gray-900/50 transition-colors">
      <div className="flex-shrink-0 mr-4">
        <Link href={`/profile/${tweet.author?.username}`}>
          <img
            src={tweet.author?.avatar_url || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
            alt={tweet.author?.name || "User"}
            className="w-12 h-12 rounded-full"
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Link href={`/profile/${tweet.author?.username}`} className="font-bold hover:underline">
            {tweet.author?.name}
          </Link>
          <span className="text-gray-500">@{tweet.author?.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 hover:underline">
            {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed">{tweet.title}</p>
        <div className="flex items-center justify-between mt-3 max-w-md">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:bg-blue-500/10 rounded-full p-1">
              <path
                fill="currentColor"
                d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
              />
            </svg>
            <span className="text-sm">0</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:bg-green-500/10 rounded-full p-1">
              <path
                fill="currentColor"
                d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
              />
            </svg>
            <span className="text-sm">0</span>
          </button>
          <Likes tweet={tweet} addOptimisticTweet={updateOptimisticTweets} />
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:bg-blue-500/10 rounded-full p-1">
              <path
                fill="currentColor"
                d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
              />
            </svg>
            <span className="text-sm">0</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:bg-blue-500/10 rounded-full p-1">
              <path
                fill="currentColor"
                d="M3 2.5C3 1.671 3.671 1 4.5 1h15c.829 0 1.5.671 1.5 1.5v17c0 .829-.671 1.5-1.5 1.5h-15c-.829 0-1.5-.671-1.5-1.5v-17zM4.5 3h15v14h-15V3zm5.25 2.5h-1.5v9h1.5v-9zm3.25 0h-1.5v9h1.5v-9zm3.25 0h-1.5v9h1.5v-9z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ));
}
