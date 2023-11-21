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
          className="text-xs !w-[280px] [&>*]:!bg-gray-800 [&>*]:!text-gray-300 [&>*]:!min-h-[60px]"
        />
        <ListBoard>{children}</ListBoard>
      </WatchListProvider>
    </>
  );
}
