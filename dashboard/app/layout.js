"use client";

import Sidebar from "../src/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-10 bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
