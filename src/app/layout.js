import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kingdom Keep | A hex-based strategy game",
  description:
    "Kingdom Keep is a hex-based strategy game where you build and defend your kingdom.",
  icon: "./favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
