import ListBoard from "@/components/listBoard";
import { ToastContainer } from "react-toastify";
import { WatchListProvider } from "@/context/WatchListContext";

export default function ListsLayout({ children }) {
  return (
    <>
      <WatchListProvider>
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
      </WatchListProvider>
    </>
  );
}
