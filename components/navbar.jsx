"use client";
import React from "react";
import Link from "next/link";
import { useUserSession, userSignIn, userSignOut } from "../lib/session";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineGoogle } from "react-icons/ai";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import clsx from "clsx";
import { useActivePageContext } from "@/context/activePageContext";
import { Spinner } from "./loaders";

export default function Navbar() {
  const { status, session } = useUserSession();

  const { activePage, setActivePage, setTimeOfLastClick } =
    useActivePageContext();

  if (status === "loading") {
    return (
      <header className="my-5 pb-20 container mx-auto max-w-screen-2xl max-md:px-4 fixed left-0 right-0 z-[999]">
        <Spinner />
      </header>
    );
  }

  return (
    <header className="my-5 pb-20 container mx-auto max-w-screen-2xl max-md:px-4 fixed left-0 right-0 z-[999]">
      {status === "authenticated" ? (
        <div className="flex justify-between items-center gap-8">
          <motion.div
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link href="/" className="text-gray-300 text-3xl">
              List
              <span className="font-extrabold italic">MM</span>
            </Link>
          </motion.div>
          <motion.nav
            className="absolute m-auto left-0 right-0 w-fit z-[999] bg-gray-800 bg-opacity-80 backdrop-blur-xl rounded-3xl py-3 px-6 shadow-sm max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-sm max-sm:py-4 max-sm:rounded-t-xl"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <ul className="flex justify-center items-center space-x-8 max-xs:space-x-4">
              {links.map((link) => (
                <motion.li key={link.hash}>
                  <Link
                    href={link.hash}
                    className={clsx(
                      "text-gray-300 hover:text-opacity-95 active:text-opacity-80 active:duration-75 duration-200 px-3 py-1 relative z-50 max-sm:text-lg",
                      {
                        "text-opacity-95": activePage === link.name,
                      }
                    )}
                    onClick={() => {
                      setActivePage(link.name);
                      setTimeOfLastClick(Date.now());
                    }}
                  >
                    {link.name}
                    {link.name === activePage && (
                      <motion.span
                        className="bg-gray-700 bg-opacity-60 rounded-full border border-gray-700 absolute inset-0 -z-10"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        layoutId="activePage"
                        transition={{
                          stiffness: 400,
                          damping: 40,
                        }}
                      ></motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
          <motion.div
            className="flex gap-2"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={50}
              height={50}
              className="rounded-full object-cover select-none"
            />
            <button
              onClick={() => userSignOut()}
              className="text-gray-300 text-2xl hover:opacity-80 duration-200 active:scale-95 active:duration-75"
              aria-label="Sign Out"
            >
              <AiOutlineLogout />
            </button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex justify-center items-center"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => userSignIn()}
            className="flex justify-center items-center gap-2 text-slate-800 border rounded-sm text-lg border-gray-950 px-8 py-2 bg-gray-300 hover:bg-opacity-0 hover:text-gray-300 hover:border-slate-300 duration-300 active:scale-95 active:duration-75"
            aria-label="Sign In"
          >
            Sign In
            <AiOutlineGoogle className="text-xl" />
          </button>
        </motion.div>
      )}
    </header>
  );
}
