"use client";

import "./globals.css";
import { Header } from "@/widgets/layouts/Header";
import { Banner } from "@/widgets/layouts/Banner";
import { ApolloClientProvider } from "@/app/provider/ApolloProvider";
import { Footer } from "@/widgets/layouts/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const HIDDEN_HEADER = ["/login", "/signup"];
  const header = HIDDEN_HEADER.includes(String(pathname));

  return (
    <ApolloClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`flex flex-col items-center justify-start w-full max-sm:gap-0
            ${header ? "gap-0" : "gap-10"}
          `}
        >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <header className="flex flex-col justify-center items-center w-full h-fit">
            <Header />
            <Banner />
          </header>
          <main
            className={`flex items-start justify-center h-fit mb-5
              ${header ? "w-screen max-w-[1980px]" : "w-full max-w-[1280px]"}
            `}
          >
            {children}
          </main>
          {!header && <Footer />}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ApolloClientProvider>
  );
}
