import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Header from "./layout/header";

export const defaultPageTitle = "Set by Tangerine";

export const metadata: Metadata = {
  title: defaultPageTitle,
  description: "Crosswords and other puzzles by Tangerine",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Header />
        <TRPCReactProvider>
          <HydrateClient>
            <main className="flex min-h-screen flex-col text-black">
              <div className="container mx-auto flex flex-col justify-start gap-6 p-4">
                {children}
              </div>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
