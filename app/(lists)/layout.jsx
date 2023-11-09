import ListBoard from "@/components/listBoard";
import { ToastContainer } from "react-toastify";

export default function ListsLayout({ children }) {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
      <ListBoard>{children}</ListBoard>
    </>
  );
}
