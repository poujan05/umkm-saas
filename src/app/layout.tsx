import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UMKM SaaS",
  description: "Website SaaS untuk UMKM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-white text-black min-h-screen">
        <Navbar />

        {/* 🔥 GLOBAL WRAPPER */}
        <main className="p-6 max-w-6xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}