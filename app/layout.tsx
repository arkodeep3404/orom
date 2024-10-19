import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import RecoilContextProvider from "@/lib/stateStore/globalState";
import { Suspense } from "react";

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
        <Suspense fallback={<>Loading...</>}>
          <RecoilContextProvider>
            {children}
            <Toaster position="top-right" expand duration={5000} />
          </RecoilContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
