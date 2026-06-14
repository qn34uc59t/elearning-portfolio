import type { Metadata } from "next";
import { Inter } from "next/font/google";
import favicon from "@/assets/favicon.png";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Illia Neviezhyn Portfolio",
  description: "Instructional Designer & Learning Content Developer Portfolio",
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
