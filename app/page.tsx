import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import NewTweets from "./new-tweets";
import Tweets from "./tweets";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(*)");

  const tweets = data?.map((tweet) => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find(
      (like) => like.user_id === session.user.id
    ),
    likes: tweet.likes.length,
  })) ?? [];

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">ホーム</h1>
          <div className="flex space-x-4">
            <button className="text-gray-400 hover:text-white">すべて</button>
            <button className="text-gray-400 hover:text-white">フォロー中</button>
          </div>
        </div>
      </div>

      {/* ツイート投稿フォーム */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src={session.user.user_metadata.avatar_url || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <NewTweets />
          </div>
        </div>
      </div>

      {/* ツイート一覧 */}
      <div className="divide-y divide-gray-800">
        <Tweets tweets={tweets} />
      </div>
    </div>
  );
}
