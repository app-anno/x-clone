import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X Clone",
  description: "X Clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <div className="flex min-h-screen">
          {/* 左サイドバー */}
          <div className="fixed w-[275px] h-screen flex flex-col items-end px-4 py-2">
            <div className="flex flex-col items-start space-y-4">
              {/* ロゴ */}
              <div className="p-3 hover:bg-gray-900 rounded-full">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </div>

              {/* ナビゲーションメニュー */}
              <nav className="space-y-1">
                <Link href="/" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="currentColor"
                      d="M4 26V10h24v16H4zM6 24h20V12H6v12z"
                    />
                  </svg>
                  <span>ホーム</span>
                </Link>
                <Link href="/explore" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                    />
                  </svg>
                  <span>検索</span>
                </Link>
                <Link href="/notifications" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="currentColor"
                      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                    />
                  </svg>
                  <span>通知</span>
                </Link>
                <Link href="/messages" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="currentColor"
                      d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
                    />
                  </svg>
                  <span>メッセージ</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="currentColor"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  <span>プロフィール</span>
                </Link>
              </nav>

              {/* 投稿ボタン */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full">
                投稿する
              </button>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="ml-[275px] flex-1 border-x border-gray-800">
            {children}
          </div>

          {/* 右サイドバー */}
          <div className="w-[350px] p-4">
            {/* 検索バー */}
            <div className="sticky top-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="検索"
                  className="w-full bg-gray-900 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
