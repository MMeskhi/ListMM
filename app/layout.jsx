import "./globals.css";
import { GeistSans } from "geist/font";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import constructMetadata from "@/lib/utils";
import { NextAuthProvider } from "./providers";

export const metadata = constructMetadata();

export const viewport = {
  themeColor: "#171717",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} font-semibold flex min-h-screen flex-col justify-between px-8 bg-neutral-900`}
      >
        <NextAuthProvider>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            closeButton={false}
            rtl={false}
            pauseOnFocusLoss
            theme="dark"
          />
          <Navbar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
