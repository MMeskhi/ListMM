"use client";
import React from "react";
import Link from "next/link";
import { useUserSession, userSignIn, userSignOut } from "../lib/session";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineGoogle } from "react-icons/ai";

export default function Navbar() {
  const { status, session } = useUserSession();
  return (
    <header className="my-5 container mx-auto max-w-screen-2xl">
      {status === "authenticated" ? (
        <div className="flex justify-between items-center gap-8">
          <Link href="/watch" className="text-slate-200 text-3xl">
            ListMM
          </Link>
          <nav className="">
            <ul className="flex justify-center items-center space-x-8">
              <li>
                <Link href="/watch" className="text-slate-200">
                  Watch
                </Link>
              </li>
              <li>
                <Link href="/listen" className="text-slate-200">
                  Listen
                </Link>
              </li>
              <li>
                <Link href="/play" className="text-slate-200">
                  Play
                </Link>
              </li>
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
              className="text-slate-200 text-2xl hover:opacity-80 duration-200"
            >
              <AiOutlineLogout />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <button
            onClick={() => userSignIn()}
            className="flex justify-center items-center gap-2 text-slate-300 border text-lg border-slate-200 px-9 py-3 bg-slate-200 bg-opacity-5 hover:bg-opacity-0 hover:text-slate-300 hover:border-slate-300 duration-200"
          >
            Sign In
            <AiOutlineGoogle class="text-xl text-slate-200" />
          </button>
        </div>
      )}
    </header>
  );
}
