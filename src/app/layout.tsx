import type { Metadata } from "next";
import { Share_Tech, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import "./globals.css";
import "./extends-class.css"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const shareTech = Share_Tech({
  variable: "--font-share-tech",
  weight: ["400"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Todo app",
  description: "Make your team organizeable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", shareTech.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
