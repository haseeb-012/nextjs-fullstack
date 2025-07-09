"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo & Home */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-xl hover:text-blue-400 transition-colors"
          prefetch={true}
          onClick={() =>
            showNotification("Welcome to ImageKit ReelsPro", "info")
          }>
          <Home className="w-6 h-6" />
          <span>Video with AI</span>
        </Link>

        {/* User Dropdown */}
        <div className="relative group">
          <button
            tabIndex={0}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
            <User className="w-6 h-6 text-white" />
          </button>
          <ul className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none group-focus-within:pointer-events-auto group-hover:pointer-events-auto transition-opacity">
            {session ? (
              <>
                <li className="px-4 py-1 text-gray-600 text-sm">
                  {session.user?.email?.split("@")[0]}
                </li>
                <div className="border-t my-1"></div>
                <li>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    onClick={() =>
                      showNotification("Welcome to Admin Dashboard", "info")
                    }>
                    Video Upload
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 rounded transition w-full text-left">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                  onClick={() =>
                    showNotification("Please sign in to continue", "info")
                  }>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
