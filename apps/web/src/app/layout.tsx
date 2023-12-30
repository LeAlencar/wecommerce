'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "../relay/environment";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const environment = getCurrentEnvironment()


  return (
    <html lang="en">
      <RelayEnvironmentProvider environment={environment}>
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </RelayEnvironmentProvider>
    </html>
  );
}
