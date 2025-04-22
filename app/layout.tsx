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
        <body className="flex flex-col items-center justify-start w-full h-screen gap-10">
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <header className="w-full h-fit">
            <Header />
            <Banner />
          </header>
          <main className="flex items-start justify-center w-full max-w-[1280px] h-fit  px-5">
            {children}
          </main>
          <Footer />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ApolloClientProvider>
  );
}
