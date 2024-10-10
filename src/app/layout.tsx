import ThemeProvider from "@/providers/ThemeProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import TokenQuery from "@/providers/Spotify/TokenQueryProvider";
import type { Metadata } from "next";
import { Metadata as mData } from "./metadata";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = mData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <TanstackQueryProvider>
            <TokenQuery>{children}</TokenQuery>
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
