import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navigation from "@/app/components/navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Current Weather",
  description: "Created by kjesien",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
