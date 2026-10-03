// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar"; //imported the navbar
import Footer from "@/app/components/footer";
import { CartProvider } from "@/app/context/cartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. updated title and description
export const metadata: Metadata = {
  title: "Trendy Wears",
  description: "Slides, sneakers, clothes and trousers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  {/* Everything inside CartProvider can use the cart */}
  <CartProvider>
    <Navbar />
    {children}
    <Footer />
  </CartProvider>
      </body>
    </html>
  );
}