"use client";

import "./globals.css";
import { Header } from "@/widgets/layouts/Header";
import { Footer } from "@/widgets/layouts/Footer";
import { Banner } from "@/widgets/layouts/Banner";
import { ApolloClientProvider } from "@/app/provider/ApolloProvider";
import { ThemeProvider } from "@/app/provider/ThemeProvider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const BANNER = ["/"];
  const banner = BANNER.includes(String(pathname));

  return (
    <ApolloClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-col items-center justify-center w-full overflow-x-hidden border border-red-600">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {banner && <Banner />}
            <main className="flex items-start justify-center w-full max-w-[1280px] h-screen mt-8 px-5 border border-red-400 ">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ApolloClientProvider>
  );
}
