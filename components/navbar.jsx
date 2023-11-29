"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUserSession, userSignIn, userSignOut } from "../lib/session";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineGoogle } from "react-icons/ai";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import clsx from "clsx";
import { useActivePageContext } from "@/context/activePageContext";
import { NavSkeleton, TinySpinner } from "./loaders";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar() {
  const { status, session } = useUserSession();
  const [loading, setLoading] = useState(false);

  const isMobileScreen = useMediaQuery("(max-width:600px)");

  const { activePage, setActivePage, setTimeOfLastClick } =
    useActivePageContext();

  if (status === "loading") {
    return <NavSkeleton />;
  }

  return (
    <header className="my-5 container mx-auto max-w-screen-2xl max-md:px-4 z-[999]">
      {status === "authenticated" ? (
        <div className="flex justify-between items-center gap-8">
          <motion.div
            initial={{ x: isMobileScreen ? -16 : -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link href="/" className="text-gray-300 text-3xl">
              List
              <span className="font-extrabold italic">MM</span>
            </Link>
          </motion.div>
          <motion.nav
            className="absolute m-auto left-0 right-0 w-fit z-[999] bg-gray-800 bg-opacity-80 backdrop-blur-xl rounded-3xl py-3 px-6 shadow-sm max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:py-4 max-sm:pb-3 max-sm:rounded-t-xl max-sm:rounded-none"
            initial={{ y: isMobileScreen ? 16 : -24, opacity: 0 }}
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
            initial={{ x: isMobileScreen ? 16 : 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={48}
              height={48}
              className="rounded-full object-cover select-none"
            />
            <button
              onClick={() => {
                setLoading(true);
                userSignOut();
              }}
              className="text-gray-300 text-2xl hover:opacity-80 duration-200 active:scale-95 active:duration-75"
              aria-label="Sign Out"
            >
              {loading ? <TinySpinner /> : <AiOutlineLogout />}
            </button>
          </motion.div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: isMobileScreen ? -8 : -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link href="/" className="text-gray-300 text-3xl">
              List
              <span className="font-extrabold italic">MM</span>
            </Link>
          </motion.div>
          <motion.div
            className="flex justify-center items-center py-px"
            initial={{ x: isMobileScreen ? 8 : 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <button
              onClick={() => {
                setLoading(true);
                userSignIn();
              }}
              className="flex justify-center items-center gap-2 text-slate-800 border rounded-sm text-lg border-gray-950 px-6 py-2 bg-gray-300 hover:bg-opacity-0 hover:text-gray-300 hover:border-slate-300 duration-300 active:scale-95 active:duration-75"
              aria-label="Sign In"
            >
              Sign In
              {loading ? (
                <TinySpinner />
              ) : (
                <AiOutlineGoogle className="text-xl" />
              )}
            </button>
          </motion.div>
        </div>
      )}
    </header>
  );
}
