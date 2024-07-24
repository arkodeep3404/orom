import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import RecoilContextProvider from "@/lib/stateStore/globalState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orom",
  description: "Orom ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          {children}
          <Toaster />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
