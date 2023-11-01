"use client";
import React from "react";
import Link from "next/link";
import { useUserSession, userSignIn, userSignOut } from "../lib/session";
import Image from "next/image";

export default function Navbar() {
  const { status, session } = useUserSession();
  return (
    <header className="my-5">
      {status === "authenticated" ? (
        <div className="flex justify-between items-center gap-8">
          <Link href="/" className="text-slate-200 text-3xl">
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
              width={60}
              height={60}
              className="rounded-full"
            />
            <button onClick={() => userSignOut()} className="text-red-600">
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button onClick={() => userSignIn()} className="text-green-600">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
