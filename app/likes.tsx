"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Likes({
  tweet,
  addOptimisticTweet,
}: {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
}) {
  const router = useRouter();
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const newTweet = {
        ...tweet,
        likes: tweet.user_has_liked_tweet ? tweet.likes - 1 : tweet.likes + 1,
        user_has_liked_tweet: !tweet.user_has_liked_tweet,
      };
      startTransition(() => {
        addOptimisticTweet(newTweet);
      });

      if (tweet.user_has_liked_tweet) {
        await supabase.from("likes").delete().match({
          tweet_id: tweet.id,
          user_id: user.id,
        });
      } else {
        await supabase.from("likes").insert({
          tweet_id: tweet.id,
          user_id: user.id,
        });
      }
      router.refresh();
    }
  };
  return <button onClick={handleLikes}>{tweet.likes} Likes</button>;
}
