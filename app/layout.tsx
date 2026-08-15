/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This root layout wraps every page in the application.
It loads the global stylesheet and displays the shared navigation bar and footer.
The layout provides a consistent responsive structure for all application pages.
*/

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export const metadata: Metadata = {
  title: "IMR Movies",
  description: "Internet Movies Rental movie management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-100">
        <Navbar />

        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}