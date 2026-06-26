import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AIChatbot from "@/components/ai-chatbot";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlamSync - AI Beauty & Styling Platform",
  description: "Discover salons, find stylists, and plan your beauty journey.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <AIChatbot />
        </Providers>
      </body>
    </html>
  );
}