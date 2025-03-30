import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweets() {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("tweets").insert({ title, user_id: user.id });
    }
  };

  return (
    <form action={addTweet} className="flex-1">
      <textarea
        name="title"
        className="w-full bg-transparent text-xl placeholder-gray-500 outline-none resize-none"
        required
        placeholder="いまどうしてる？"
        rows={3}
      />
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="currentColor"
                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10l-4-4v3H8v2h6v3l4-4z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="currentColor"
                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10l-4-4v3H8v2h6v3l4-4z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="currentColor"
                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10l-4-4v3H8v2h6v3l4-4z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="currentColor"
                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10l-4-4v3H8v2h6v3l4-4z"
              />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          投稿する
        </button>
      </div>
    </form>
  );
}
