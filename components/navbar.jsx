import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="my-5">
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
    </header>
  );
}
