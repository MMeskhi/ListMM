import "./globals.css";
import { GeistSans } from "geist/font";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import constructMetadata from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "../lib/providers";

export const metadata = constructMetadata();

export const viewport = {
  themeColor: "#171717",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} font-semibold flex min-h-screen flex-col justify-between bg-gray-900`}
      >
        <NextAuthProvider session={session}>
          <Navbar />
          <main className="container mx-auto max-w-screen-2xl flex-1 h-full">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
