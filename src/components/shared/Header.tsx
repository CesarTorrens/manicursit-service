"use client";
import Link from "next/link";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  return (
    <>
      <header
        style={{ maxWidth: "530px" }}
        className="bg-white fixed z-10 text-gray-600 bottom-0 w-full p-5 text-lg  border-t-2 border-slate-200"
      >
        <nav>
          <ul className="flex justify-center items-center gap-5">
            <Link
              href="/"
              className={
                pathName !== "/myturns"
                  ? "text-center text-blue-500 flex flex-col items-center gap-1"
                  : "text-center flex flex-col items-center gap-1"
              }
            >
              {" "}
              <IoPersonAddSharp size={20} />
              <p className="text-sm">Reserve</p>
            </Link>
            <li className="text-center">
              <Link
                href="/myturns"
                className={
                  pathName === "/myturns"
                    ? "text-center text-blue-500 flex flex-col items-center gap-1"
                    : "text-center flex flex-col items-center gap-1"
                }
              >
                {" "}
                <IoPersonSharp size={20} />
                <p className="text-sm">My Turns</p>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
