import "./globals.css";
import { Header } from "@/widgets/layouts/Header";
import { Banner } from "@/widgets/layouts/Banner";
import { ApolloClientProvider } from "@/app/provider/ApolloProvider";
import { Footer } from "@/widgets/layouts/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-col items-center justify-start w-full gap-10 max-sm:gap-0">
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
          <main className="flex items-start justify-center w-full max-w-[1280px] h-fit mb-5">
            {children}
          </main>
          <Footer />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ApolloClientProvider>
  );
}
