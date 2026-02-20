import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import { Providers } from "./providers";

import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "./MySessionProvider/MySessionProvider";
import { CartContextProvider } from '../Context/CartContext'
import { WishlistContextProvider } from "@/Context/WishlistContext";
import ScrollToTop from "./_components/ScrollToTop/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Shop smart with Fresh Cart. Discover great products, easy checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable ?? ""} ${geistMono.variable ?? ""} antialiased`}>
      <body>
        <MySessionProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <Providers>
                <ScrollToTop />
                <Navbar />
                {children}
                <Toaster />
              </Providers>
            </WishlistContextProvider>
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
