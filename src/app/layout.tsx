import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drawing-io",
  description: "A simple drawing app",
  url: "https://drawing-io.vercel.app",
  image: "https://drawing-io.vercel.app/images/og.png",
  twitter: "@drawing-io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
