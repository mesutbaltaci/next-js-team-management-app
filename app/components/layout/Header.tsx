"use client";

import { User } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const pathName = usePathname();

  const navigation = [
    { name: "Home", href: "/", show: true },
    { name: "Dashboard", href: "/dashboard", show: true },
  ].filter((item) => item.show);

  const getNavItemClass = (href: string) => {
    let isActive = false;
    if (href === "/") {
      isActive = pathName === "/";
    } else if (href === "/dashboard") {
      isActive = pathName.startsWith(href);
    }
    return `px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;
  };
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <Link href="/" className="font-bold text-xl text-white ">
            Team Access
          </Link>
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={getNavItemClass(item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* user info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-slate-300"> Mesut</span>
                <button className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-slate-300 text-sm hover:bg-slate-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg   hover:bg-blue-900"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
