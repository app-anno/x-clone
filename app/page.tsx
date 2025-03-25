import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import NewTweets from "./new-tweets";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*)");

  return (
    <>
      <AuthButtonServer />
      <NewTweets />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  );
}
