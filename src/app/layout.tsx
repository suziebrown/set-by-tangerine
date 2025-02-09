import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Header from "./layout/header";

export const metadata: Metadata = {
  title: "Set by Tangerine",
  description: "Crosswords and other puzzles by Tangerine",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
            <main className="flex min-h-screen flex-col bg-gradient-to-b from-orange-300 to-orange-500 text-black">
              <div className="container flex flex-col justify-start gap-6 p-4">
                {children}
              </div>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
