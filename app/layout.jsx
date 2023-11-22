import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import constructMetadata from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "../lib/providers";
import { ActivePageContextProvider } from "@/context/activePageContext";
import { WatchListProvider } from "@/context/WatchListContext";
import { Analytics } from "@vercel/analytics/react";

export const geist = localFont({
  src: "../components/ui/fonts/GeistVariableVF.woff2",
  variable: "--font-geist",
  weight: "600 800",
  display: "swap",
  style: "normal",
});

export const metadata = constructMetadata();

export const viewport = {
  themeColor: "#171717",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geist.variable} font-sans font-semibold flex min-h-screen flex-col justify-between bg-gray-900 overflow-x-hidden`}
      >
        <NextAuthProvider session={session}>
          <WatchListProvider>
            <ActivePageContextProvider>
              <Navbar />
              <main className="container mx-auto max-w-screen-2xl flex-1 h-full max-md:px-2">
                {children}
                <Analytics />
              </main>
              <Footer />
            </ActivePageContextProvider>
          </WatchListProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
