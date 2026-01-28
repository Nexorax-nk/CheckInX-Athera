import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EntryFlow Dashboard",
  description: "Event Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* 1. Sidebar (Fixed width) */}
          <Sidebar />

          {/* 2. Main Content Area (Pushed right by 16rem/64 tailwind units) */}
          <main className="flex-1 ml-64 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}