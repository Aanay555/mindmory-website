import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindmory Assessment & Examination Portal",
  description: "Official Nationwide Academic Competition & Testing Desk"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
