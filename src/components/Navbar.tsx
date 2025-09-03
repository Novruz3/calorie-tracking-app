"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<{ firstname?: string }>({});
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    router.push("/welcome");
  };

  return (
    <div className="w-full bg-blue-500 h-18 rounded-b-2xl grid grid-cols-3 items-center px-8 text-white">
      <div className=" text-2xl flex gap-2 col-span-1">
        <span>Welcome</span>
        <span className="font-bold">{user.firstname}!</span>
      </div>
      <ul className="flex gap-4 text-lg col-span-1 justify-center">
        <Link
          href="/"
          className={`hover:font-bold cursor-pointer ${
            pathname == "/" ? "font-bold" : ""
          }`}
        >
          Daily
        </Link>
        <Link
          href="/total"
          className={`hover:font-bold cursor-pointer ${
            pathname == "/total" ? "font-bold" : ""
          }`}
        >
          Total
        </Link>
      </ul>
      <button
        onClick={handleLogout}
        className="text-lg col-span-1 justify-end flex hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
