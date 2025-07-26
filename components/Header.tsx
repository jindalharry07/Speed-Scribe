import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#0e0e0e] text-white shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 hover:scale-130 transition-transform duration-200 cursor-pointer">
              <Image
                src="/logo.png"
                alt="SpeedScribe Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-wide hover:scale-105 text-indigo-400 cursor-pointer">
              SpeedScribe
            </span>
          </div>
          
          {/* GitHub Icon */}
          <nav>
            <Link
              href="https://github.com/jindalharry07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-400 transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <Icon icon="mdi:github" width="26" height="26" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
