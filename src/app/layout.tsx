import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/shared/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manicurist Service",
  description: "Prueba tecnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          style={{ maxWidth: "530px" }}
          className="flex min-h-screen flex-col items-center px-5 mx-auto relative border-x-2 border-slate-200  bg-white shadow-lg"
        >
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
