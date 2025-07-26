import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./index.css";

export const metadata: Metadata = {
  title: "Speed Scribe",
  description: "Improve your typing speed and accuracy with Speed Scribe.",
  icons: {
    icon: "/favicon.png",
  },
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="bg-[#0e0e0e] text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
