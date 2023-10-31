import { GeistSans } from "geist/font";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MainLayout from "@/components/main-layout";
import { ToastContainer } from "react-toastify";

export default function ListsLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} font-semibold flex min-h-screen flex-col justify-between px-8 bg-neutral-900`}
      >
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
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}