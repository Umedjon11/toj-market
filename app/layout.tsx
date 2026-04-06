import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/header";
import StoreProvider from "@/store/storeProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toj Market",
  description: "Online market where you can buy and sell products",
  metadataBase: new URL("https://toj-market.core.tj"),
  openGraph: {
    title: "Toj Market",
    description: "Online market where you can buy and sell products",
    url: "https://toj-market.core.tj",
    siteName: "Toj Market",
    images: "/og-image.png",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Toj Market",
    description: "Online market where you can buy and sell products",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F8F9] dark:bg-black roboto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <StoreProvider>
              <Header />
              {children}
              <Toaster position="bottom-right" reverseOrder={false} />
              <Footer />
            </StoreProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
