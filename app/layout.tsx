import "./globals.css";
import { Header } from "@/widgets/layouts/Header";
import { Banner } from "@/widgets/layouts/Banner";
import { ApolloClientProvider } from "@/app/provider/ApolloProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-col items-center justify-center w-full gap-10 px-5">
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
          <main className="flex items-start justify-center w-full max-w-[1280px] h-fit">
            {children}
          </main>
          {/* <Footer /> */}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ApolloClientProvider>
  );
}
