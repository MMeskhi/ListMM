"use client";
import React from "react";
import Link from "next/link";
import { useUserSession, userSignIn, userSignOut } from "../lib/session";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineGoogle } from "react-icons/ai";
import { motion } from "framer-motion";
import { links } from "@/lib/data";

export default function Navbar() {
  const { status, session } = useUserSession();
  return (
    <header className="my-5 container mx-auto max-w-screen-2xl">
      {status === "authenticated" ? (
        <div className="flex justify-between items-center gap-8">
          <Link href="/" className="text-gray-300 text-3xl">
            List
            <span className="font-extrabold italic">MM</span>
          </Link>
          <nav className="z-[999] bg-gray-800 bg-opacity-80 backdrop-blur-xl rounded-3xl py-3 px-6 shadow-sm max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-sm max-sm:py-4">
            <ul className="flex justify-center items-center space-x-8">
              {links.map((link) => (
                <li key={Link.hash}>
                  <Link
                    href={link.hash}
                    className="text-gray-300 hover:text-opacity-95 active:text-opacity-90 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-4">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <button
              onClick={() => userSignOut()}
              className="text-gray-300 text-2xl hover:opacity-80 duration-200"
            >
              <AiOutlineLogout />
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex justify-center items-center mt-20"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => userSignIn()}
            className="flex justify-center items-center gap-2 text-slate-800 border rounded-sm text-lg border-gray-950 px-9 py-3 bg-gray-300 hover:bg-opacity-0 hover:text-gray-300 hover:border-slate-300 duration-300"
          >
            Sign In
            <AiOutlineGoogle className="text-xl" />
          </button>
        </motion.div>
      )}
    </header>
  );
}
