import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PopupModal from "@/components/PopupModal";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "HRCA Mega Events - National Competitions & Awards",
  description: "Join the premier national English, Science, Art & Creative Writing competitions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-amber-400 selection:text-slate-950">
        <CustomCursor />
        <PopupModal />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}