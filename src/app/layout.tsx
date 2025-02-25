import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/layout/Header";
import { Footer } from "@/widgets/layout/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex items-start justify-center p-8 w-full h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
