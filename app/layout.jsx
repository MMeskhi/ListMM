import "./globals.css";
import { Inter } from "@next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import constructMetadata from "@/lib/utils";
import { NextAuthProvider } from "../lib/providers";
import { ActivePageContextProvider } from "@/context/activePageContext";
import { WatchPageProvider } from "@/context/watchPageContext";
import { ListenPageProvider } from "@/context/listenPageContext";
import { PlayPageProvider } from "@/context/playPageContext";

const inter = Inter({ weight: "700", subsets: ["latin"] });

export const metadata = constructMetadata();

export const viewport = {
  themeColor: "#171717",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col justify-between bg-gray-900 overflow-x-hidden`}
      >
        <NextAuthProvider>
          <ActivePageContextProvider>
            <Navbar />
            <main className="container mx-auto max-w-screen-2xl flex-1 h-full max-md:px-2 mt-2 max-sm:mt-0 ">
              <WatchPageProvider>
                <ListenPageProvider>
                  <PlayPageProvider>{children}</PlayPageProvider>
                </ListenPageProvider>
              </WatchPageProvider>
            </main>
            <Footer />
          </ActivePageContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
