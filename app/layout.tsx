"use client";

import "./globals.css";
import { Header } from "@/widgets/layouts/Header";
import { Footer } from "@/widgets/layouts/Footer";
import { Banner } from "@/widgets/layouts/Banner";
import { ApolloClientProvider } from "@/app/provider/ApolloProvider";
import { ThemeProvider } from "@/app/provider/ThemeProvider";
import { usePathname } from "next/navigation";

const BANNER_HIDDEN = ["/B"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const banner = BANNER_HIDDEN.includes(String(pathname));

  return (
    <ApolloClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-col items-center justify-center w-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {!banner && <Banner />}
            <main className="flex items-start justify-center p-8 w-[1280px] h-screen bg-pink-400">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ApolloClientProvider>
  );
}
