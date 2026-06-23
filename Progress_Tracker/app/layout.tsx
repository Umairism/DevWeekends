import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Progress Tracker",
  description: "Track your learning progress across courses and roadmaps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-gray-50 dark:bg-zinc-900`}
    >
      <body className="flex h-screen w-full overflow-hidden text-gray-900 dark:text-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full w-full max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
