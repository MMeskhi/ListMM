"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SiNextdotjs, SiTailwindcss, SiGithub, SiVercel } from "react-icons/si";

export default function Footer() {
  const pathname = usePathname();

  const noFooterPages = ["/watch", "/listen", "/play"];

  if (noFooterPages.includes(pathname)) return null;

  const madeByBox = {
    default: { y: -20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <footer className="container mx-auto px-28 xl:px-20 max-w-6xl mt-8 mb-4 flex justify-center items-center relative z-[88]">
      <motion.div
        className="flex flex-col justify-center items-center w-fit relative"
        initial="default"
        whileHover="hover"
      >
        <motion.span
          className="text-gray-300 text-opacity-90 text-sm absolute -top-36 border border-gray-800 border-opacity-80 pl-4 pr-16 whitespace-nowrap py-3 bg-gray-950 bg-opacity-10  backdrop-blur-xl rounded-md shadow-sm space-y-2 [&>*]:flex [&>*]:items-center [&>p>svg]:mr-2 pointer-events-none"
          variants={madeByBox}
        >
          <p>
            <SiNextdotjs /> Next.js for code
          </p>
          <p>
            <SiTailwindcss /> Tailwind for UI
          </p>
          <p>
            <SiGithub /> GitHub for versions
          </p>
          <p>
            <SiVercel /> Vercel for host
          </p>
        </motion.span>
        <motion.div
          className="text-gray-300 text-opacity-95 text-center cursor-default whitespace-nowrap select-none"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          &copy; 2023 Mikheil Meskhi
        </motion.div>
      </motion.div>
    </footer>
  );
}
