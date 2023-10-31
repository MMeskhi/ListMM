import { GeistSans } from "geist/font";
import "./globals.css";
import constructMetadata from "@/lib/utils";
import Providers from "@/components/providers";

export const metadata = constructMetadata();

export const viewport = {
  themeColor: "#171717",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} flex min-h-screen flex-col justify-between px-8 bg-neutral-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
