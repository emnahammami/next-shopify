import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Provider } from 'react-redux';

import { store } from '../store/store';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "products",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
