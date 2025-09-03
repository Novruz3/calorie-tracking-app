"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {!pathname.toLowerCase().includes("welcome") ? <Navbar /> : <></>}
        {children}
      </body>
    </html>
  );
}
