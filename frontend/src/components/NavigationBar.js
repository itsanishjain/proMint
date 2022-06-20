import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="rounded-lg p-4 mx-auto max-w-4xl mt-4 overflow-x-auto bg-blue-500 text-white ">
      <div className="flex space-x-4 ">
        <Link href="/">
          <a className="text-lg font-medium p-1 hover:bg-blue-400 hover:rounded ease-in">
            Home
          </a>
        </Link>

        <Link href="/about">
          <a className="text-lg font-medium p-1 hover:bg-blue-400 hover:rounded">
            About
          </a>
        </Link>

        <Link href="https://twitter.com/itsanishjain">
          <a className="text-lg font-medium p-1 hover:bg-blue-400 hover:rounded">
            Contact
          </a>
        </Link>
      </div>
    </nav>
  );
}
